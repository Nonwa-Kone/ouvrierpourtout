const express = require('express');
const router = express.Router();

const document = require('../../controllers/document');
const multerConfig = require('../../middleware/multer-config');

router.get('/', document.getDocuments);
router.get('/get-by-owner-id/:ownerId', document.getDocumentByOwnerId);
router.get('/:id', document.getDocument);
router.post('/:ownerId', document.createDocument);
router.put('/:id', multerConfig, document.updateDocument);
router.put('/:id/status', document.changeStatusDocument);
router.delete('/:id', document.deleteDocument);

module.exports = router;
