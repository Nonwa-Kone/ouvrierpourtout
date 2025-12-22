const ContractModel = require('../../models/contract/Contract');

exports.createContract = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, message: 'Aucun corps de requête' });
    }
    if (!req.body.typeContract) {
      return res
        .status(400)
        .json({ success: false, message: 'Type de contrat manquant' });
    }
    const contractFound = await ContractModel.findOne({
      ouvrier: req.body.ouvrier,
    });
    if (contractFound) {
      return res
        .status(200)
        .json({ success: false, message: 'Contrat déjà existant' });
    }
    const contract = new ContractModel(req.body);
    await contract.save();
    res.status(201).json(contract);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.updateContract = async (req, res) => {
  try {
    const contract = await ContractModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.deleteContract = async (req, res) => {
  try {
    const contract = await ContractModel.findByIdAndDelete(req.params.id);
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.getContract = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'Aucun ID de contrat' });
    }
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'ID invalide' });
    }
    const contract = await ContractModel.findById(id);
    res.status(200).json({ success: true, data: contract });
  } catch (error) {
    throw new Error('Erreur interne du serveur');
  }
};
