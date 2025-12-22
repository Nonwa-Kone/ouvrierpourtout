const { default: mongoose } = require('mongoose');
const EvaluationModel = require('../../models/members/Evaluation');
const { generateReference } = require('../../utils');

exports.createEvaluation = async (req, res) => {
  try {
    const evaluation = new EvaluationModel(req.body);
    evaluation.reference = generateReference('EVA', 5);
    await evaluation.save();
    res.status(201).json({
      success: true,
      data: evaluation,
      message: "L'évaluation a bien été créée",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvaluationByOuvrierId = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "L'id est obligatoire",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "L'id doit être un objectid",
      });
    }
    const evaluation = await EvaluationModel.find({
      ouvrier: req.params.id,
    });
    res.status(200).json({
      data: evaluation,
      success: true,
      message: "L'évaluation a bien été récupérée",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvaluation = async (req, res) => {
  try {
    const evaluation = await EvaluationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvaluation = async (req, res) => {
  try {
    const evaluation = await EvaluationModel.findByIdAndDelete(req.params.id);
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
