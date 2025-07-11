const Summary = require("../models/Summary");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const PDFDocument = require('pdfkit');

exports.createSummary = async (req, res) => {
  try {
    const pdfPath = req.body.pdfPath || req.file?.path;
    if (!pdfPath) return res.status(400).json({ message: "Aucun PDF fourni" });
    const filename = pdfPath.split('/').pop();

    const mode = req.body.mode || "rapide"; 
    const dataBuffer = fs.readFileSync(pdfPath);
    let text = (await pdfParse(dataBuffer)).text;
    text = text.replace(/\s+/g, ' ').trim();

    let globalSummary = "Résumé non généré";

    if (mode === "complet") {
      
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
              prompt: `Avant de résumer, anonymise toutes les informations personnelles (nom, prénom, adresse, numéro étudiant,Date de naissance, etc.) en les remplaçant par des xxxx. Résume ce texte de façon structurée et concise en français, même si le texte est dans une autre langue :\n${chunk}`,
              stream: false
            }
          );
          summaries.push(ollamaResponse.data.response || "Résumé non généré");
        } catch (err) {
          summaries.push("Erreur lors du résumé de cette partie");
        }
      }
      try {
        const allSummaries = summaries.join(' ');
        const globalPrompt = `Avant de résumer, anonymise toutes les informations personnelles (nom, prénom, adresse, numéro étudiant,Date de naissance,  etc.) en les remplaçant par des xxxx. Fais un résumé global, structuré et concis en français, même si le texte est dans une autre langue :\n${allSummaries.slice(0, 3000)}`;
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
        console.error("Erreur lors de la génération du résumé global :", err.message);
      }
      
      const summary = new Summary({ content: globalSummary, userId: req.user.id, filename });
      await summary.save();
      return res.status(201).json({ summaries, content: summary.content });
    } else {
      const extrait = text.slice(0, 3000);
      const prompt = `Avant de résumer, anonymise toutes les informations personnelles (nom, prénom, adresse, numéro étudiant,Date de naissance, etc.) en les remplaçant par des xxxx. Fais un résumé très court (10 phrases minimum) en français, même si le texte est dans une autre langue du texte suivant :\n${extrait}`;
      try {
        const response = await axios.post(
          "http://localhost:11434/api/generate",
          {
            model: "mistral",
            prompt: prompt,
            max_tokens: 200,
            stream: false
          }
        );
        globalSummary = response.data.response || globalSummary;
      } catch (err) {
        console.error("Erreur lors de la génération du résumé :", err.message);
      }
      const summary = new Summary({ content: globalSummary, userId: req.user.id, filename });
      await summary.save();
      return res.status(201).json({ content: summary.content });
    }
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

exports.downloadSummaryPdf = async (req, res) => {
  try {
    const summary = await Summary.findOne({ _id: req.params.id, userId: req.user.id });
    if (!summary) return res.status(404).json({ message: "Résumé non trouvé" });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=\"${summary.filename || 'resume'}.pdf\"`);

    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(18).text(`Résumé du document : ${summary.filename || ''}`, { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(summary.content || 'Aucun résumé disponible.');

    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du téléchargement du PDF" });
  }
};
