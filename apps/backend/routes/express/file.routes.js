const express = require('express');
const { uploadBackblaze, uploadMulter } = require('../../utils/file');

const router = express.Router();

router.post('/upload/:folder', uploadMulter, uploadBackblaze);
// router.delete('/delete/:fileId', deleteFile);

module.exports = router;
