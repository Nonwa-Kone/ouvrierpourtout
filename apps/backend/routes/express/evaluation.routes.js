const express = require('express');

const EvaluationController = require('../../controllers/members/Evaluation');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/',
  [
    check('username', "Le nom d'utilisateur est obligatoire").not().isEmpty(),
    check('note', 'La note est obligatoire').not().isEmpty(),
    check('comment', 'Le commentaire est obligatoire').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await EvaluationController.createEvaluation(req, res);
  }
);

router.get('/:id', async (req, res) => {
  await EvaluationController.getEvaluationByOuvrierId(req, res);
});

router.put(
  '/:id',
  [
    check('username', "Le nom d'utilisateur est obligatoire").not().isEmpty(),
    check('note', 'La note est obligatoire').not().isEmpty(),
    check('comment', 'Le commentaire est obligatoire').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await EvaluationController.updateEvaluation(req, res);
  }
);

router.delete('/:id', async (req, res) => {
  await EvaluationController.deleteEvaluation(req, res);
});

module.exports = router;
