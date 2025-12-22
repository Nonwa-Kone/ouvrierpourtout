const backblaze = require('backblaze-b2');
const multer = require('multer');
const Jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

require('dotenv').config();

const folders = [
  'ouvriers',
  'customers',
  'orders',
  'documents',
  'images',
  'admin',
  'partners',
];

const b2 = new backblaze({
  applicationKey: process.env.BACKBLAZE_APPLICATION_KEY,
  applicationKeyId: process.env.BACKBLAZE_APPLICATION_KEY_ID,
});

// Function to delete a file
async function deleteFile(filePath) {
  try {
    if (filePath) {
      await fs.unlink(filePath);
      console.log('Fichier supprimé avec succès:', filePath);
    } else {
      console.warn(
        'Le chemin du fichier est indéfini, aucune suppression effectuée'
      );
    }
  } catch (err) {
    console.error('Erreur lors de la suppression du fichier :', err);
  }
}

// Middleware to handle file uploads using Multer
const storage = multer.memoryStorage();
exports.uploadMulter = multer({
  storage,
}).any();

// Function to upload files to Backblaze B2
exports.uploadBackblaze = async (req, res) => {
  try {
    const { folder } = req.params;
    console.log('🚀 ~ exports.uploadBackblaze= ~ folder:', folder);

    if (!folder || !folders.includes(folder))
      return res.status(400).json({ error: 'Folder not found' });
    console.log('File:=> ', req.file);
    console.log('Files:=> ', req.files);
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files to upload' });
    }

    const authorizeRes = await b2.authorize();
    const { downloadUrl } = authorizeRes.data;

    let filesData = [];

    const uploadPromises = req.files.map(async (file) => {
      try {
        const isImage = file.mimetype.startsWith('image/');
        console.log('🚀 ~ uploadPromises ~ isImage:', isImage);

        const response = await b2.getUploadUrl({
          bucketId: process.env.BUCKET_ID,
        });
        const { authorizationToken, uploadUrl } = response.data;
        console.log('🚀 ~ uploadPromises ~ authorizationToken:', response);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        const filename = `${uniqueSuffix}_${file.originalname}`
          .toLowerCase()
          .replace(/[^\w._]/g, '_');

        const uploadRes = await b2.uploadFile({
          uploadUrl,
          uploadAuthToken: authorizationToken,
          fileName: `${folder}/original/${filename}`,
          data: file.buffer,
        });
        console.log('🚀 ~ uploadPromises ~ uploadRes:', uploadRes);

        if (isImage) {
          const image = await Jimp.read(file.buffer);
          image.resize(200, Jimp.AUTO).quality(70);

          const tempThumbnailPath = path.join(
            os.tmpdir(),
            `${uniqueSuffix}_thumb.png`
          );
          await image.writeAsync(tempThumbnailPath);
          const thumbnailBuffer = await fs.readFile(tempThumbnailPath);
          console.log(
            '🚀 ~ uploadPromises ~ thumbnailBuffer:',
            thumbnailBuffer
          );

          const thumbnailPath = `${folder}/thumb/${filename}`;
          console.log('🚀 ~ uploadPromises ~ thumbnailPath:', thumbnailPath);
          await b2.uploadFile({
            uploadUrl,
            uploadAuthToken: authorizationToken,
            fileName: thumbnailPath,
            data: thumbnailBuffer,
          });

          await deleteFile(tempThumbnailPath);
        }

        filesData.push({
          fileUrl: `${downloadUrl}/file/${process.env.BACKBLAZE_BUCKET_NAME}/${uploadRes.data.fileName}`,
          fileId: uploadRes.data.fileId,
        });
      } catch (err) {
        console.error(
          "Erreur lors de l'upload du fichier ou de la miniature :",
          err
        );
      }
    });

    await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      filesData,
      message: 'Fichiers sauvegardés avec succès',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteFileBackblaze = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    await b2.authorize();
    const fileInfo = await b2.getFileInfo(fileId);

    if (!fileInfo.data)
      return res
        .status(200)
        .json({ success: false, message: 'File not found' });

    const resFile = await b2.deleteFileVersion({
      fileId: fileInfo.data.fileId,
      fileName: fileInfo.data.fileName,
    });
    if (!resFile.data)
      return res
        .status(200)
        .json({ success: false, message: 'File not found' });
    res
      .status(200)
      .send({ success: true, message: 'File deleted successfully' });

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.downloadFileBackblaze = async (req, res, next) => {
  const fileId = req.params.fileId;
  const responseType = 'stream';
  await b2.authorize();

  try {
    const fileInfo = await b2.getFileInfo(fileId);
    const file = await b2.downloadFileById({
      fileId,
      responseType,
    });

    res.setHeader(
      'Content-disposition',
      `attachment; filename=${fileInfo.data.fileName?.split('/').pop()}`
    );
    res.setHeader('Content-Type', 'application/octet-stream');

    res.on('finish', () => {
      res.end();
    });
    file.data.pipe(res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
