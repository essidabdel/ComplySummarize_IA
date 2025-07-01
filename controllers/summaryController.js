const Summary = require("../models/Summary");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");

exports.createSummary = async (req, res) => {
  try {
    const pdfPath = req.body.pdfPath || req.file?.path;
    if (!pdfPath) return res.status(400).json({ message: "Aucun PDF fourni" });

    const dataBuffer = fs.readFileSync(pdfPath);
    let text = (await pdfParse(dataBuffer)).text;
    text = text.replace(/\s+/g, ' ').trim();

    const chunkSize = 500;
    let summaries = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      const chunk = text.slice(i, i + chunkSize).trim();
      if (chunk.length < 50) continue;
      try {
        const ollamaResponse = await axios.post(
          "http://localhost:11434/api/generate",
          {
            model: "mistral",
            prompt: `Résume ce texte de façon structurée et concise :\n${chunk}`,
            stream: false
          }
        );
        summaries.push(ollamaResponse.data.response || "Résumé non généré");
      } catch (err) {
        summaries.push("Erreur lors du résumé de cette partie");
      }
    }

    let globalSummary = "Résumé global non généré";
    try {
      const allSummaries = summaries.join(' ');
      const globalPrompt = `Fais un résumé global, structuré et concis de ce texte :\n${allSummaries.slice(0, 1500)}`;
      const globalResponse = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "mistral",
          prompt: globalPrompt,
          stream: false
        }
      );
      globalSummary = globalResponse.data.response || globalSummary;
    } catch (err) {
    }

    const summary = new Summary({ content: summaries.join("\n\n"), userId: req.user.id });
    await summary.save();
    res.status(201).json({ summaries, globalSummary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la génération du résumé" });
  }
};

exports.getSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération résumés" });
  }
};
