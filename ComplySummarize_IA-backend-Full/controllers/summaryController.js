const Summary = require("../models/Summary");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");

exports.createSummary = async (req, res) => {
  try {
    const pdfPath = req.body.pdfPath || req.file?.path;
    if (!pdfPath) return res.status(400).json({ message: "Aucun PDF fourni" });

    const dataBuffer = fs.readFileSync(pdfPath);

    let text = "";
    try {
      text = (await pdfParse(dataBuffer)).text;
    } catch (err) {
      console.error("Erreur lecture PDF :", err.message);
      return res.status(400).json({ message: "Le fichier PDF est invalide ou corrompu." });
    }

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
        console.error("Erreur lors du résumé d’un chunk :", err.message);
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
      console.error("Erreur lors du résumé global :", err.message);
    }

    const summary = new Summary({
      content: summaries.join("\n\n"),
      userId: req.user.id
    });

    await summary.save();

    res.status(201).json({ summaries, globalSummary });
  } catch (err) {
    console.error("Erreur dans createSummary :", err);
    res.status(500).json({ message: "Erreur lors de la génération du résumé" });
  }
};

exports.getSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(summaries);
  } catch (err) {
    console.error("Erreur dans getSummaries :", err);
    res.status(500).json({ message: "Erreur récupération résumés" });
  }
};
