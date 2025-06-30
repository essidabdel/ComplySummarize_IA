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
        const hfResponse = await axios.post(
          "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
          { inputs: chunk },
          { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
        );
        summaries.push(hfResponse.data[0]?.summary_text || "Résumé non généré");
      } catch (err) {
        summaries.push("Erreur lors du résumé de cette partie");
      }
    }
    const summary = new Summary({ content: summaries.join("\n\n"), userId: req.user.id });
    await summary.save();
    res.status(201).json({ summaries });
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
