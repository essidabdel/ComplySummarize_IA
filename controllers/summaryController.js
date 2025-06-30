const Summary = require("../models/Summary");

exports.createSummary = async (req, res) => {
  const { content } = req.body;
  try {
    const summary = new Summary({ content, userId: req.user.id });
    await summary.save();
    res.status(201).json(summary);
  } catch (err) {
    res.status(500).json({ message: "Erreur création résumé" });
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
