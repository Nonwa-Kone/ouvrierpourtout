const B2 = require('backblaze-b2');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');


// All functions on the b2 instance return the response from the B2 API in the success callback
// i.e. b2.foo(...).then((b2JsonResponse) => {})

const folders = ["ouvriers", "customers", "orders", "documents", "images", "admin", "partners"];

async function GetBucket() {
  try {
    await b2.authorize(); // must authorize first (authorization lasts 24 hrs)
    let response = await b2.getBucket({ bucketName: process.env.BACKBLAZE_BUCKET_NAME });
    console.log(response.data);
  } catch (err) {
    console.log('Error getting bucket:', err);
  }
}

// create B2 object instance
const b2 = new B2({
    applicationKeyId: process.env.BACKBLAZE_APPLICATION_KEY_ID, // or accountId: 'accountId'
    applicationKey: process.env.BACKBLAZE_APPLICATION_KEY, // or masterApplicationKey
    // optional:
    axios: {
        // overrides the axios instance default config, see https://github.com/axios/axios
    },
    retry: {
        retries: 3 // this is the default
        // for additional options, see https://github.com/softonic/axios-retry
    }
});

// common arguments - you can use these in any of the functions below
const common_args = {
    // axios request level config, see https://github.com/axios/axios#request-config
    axios: {
        timeout: 30000 // (example)
    },
    axiosOverride: {
        /* Don't use me unless you know what you're doing! */
    }
}

// authorize with provided credentials (authorization expires after 24 hours)
b2.authorize({
    // ...common arguments (optional)
});  // returns promise

// create bucket
b2.createBucket({
    bucketName: process.env.BACKBLAZE_BUCKET_NAME,
    bucketType: process.env.BACKBLAZE_BUCKET_TYPE // one of `allPublic`, `allPrivate`
    // ...common arguments (optional)
});  // returns promise

// delete bucket
b2.deleteBucket({
    bucketId: 'bucketId'
    // ...common arguments (optional)
});  // returns promise

// list buckets
b2.listBuckets({
    // ...common arguments (optional)
});  // returns promise

// get the bucket
b2.getBucket({
    bucketName: process.env.BACKBLAZE_BUCKET_NAME,
    // bucketId: 'bucketId' // optional
    // ...common arguments (optional)
});  // returns promise

// update bucket
b2.updateBucket({
    bucketId: process.env.BACKBLAZE_BUCKET_ID,
    bucketType: process.env.BACKBLAZE_BUCKET_TYPE
    // ...common arguments (optional)
});  // returns promise

// get upload url
b2.getUploadUrl({
    bucketId: process.env.BACKBLAZE_BUCKET_ID
    // ...common arguments (optional)
});  // returns promise

// upload file
b2.uploadFile({
    uploadUrl: 'uploadUrl',
    uploadAuthToken: 'uploadAuthToken',
    fileName: 'fileName',
    contentLength: 0, // optional data length, will default to data.byteLength or data.length if not provided
    mime: '', // optional mime type, will default to 'b2/x-auto' if not provided
    data: 'data', // this is expecting a Buffer, not an encoded string
    hash: 'sha1-hash', // optional data hash, will use sha1(data) if not provided
    info: {
        // optional info headers, prepended with X-Bz-Info- when sent, throws error if more than 10 keys set
        // valid characters should be a-z, A-Z and '-', all other characters will cause an error to be thrown
        key1: 'value',
        key2: 'value'
    },
    onUploadProgress: (event) => {} || null // progress monitoring
    // ...common arguments (optional)
});  // returns promise

// list file names
b2.listFileNames({
    bucketId: 'bucketId',
    startFileName: 'startFileName',
    maxFileCount: 100,
    delimiter: '',
    prefix: ''
    // ...common arguments (optional)
});  // returns promise

// list file versions
b2.listFileVersions({
    bucketId: 'bucketId',
    startFileName: 'startFileName',
    startFileId: 'startFileId',
    maxFileCount: 100
    // ...common arguments (optional)
});  // returns promise

// list uploaded parts for a large file
b2.listParts({
    fileId: 'fileId',
    startPartNumber: 0, // optional
    maxPartCount: 100, // optional (max: 1000)
    // ...common arguments (optional)
});  // returns promise

// hide file
b2.hideFile({
    bucketId: 'bucketId',
    fileName: 'fileName'
    // ...common arguments (optional)
});  // returns promise

// get file info
b2.getFileInfo({
    fileId: 'fileId'
    // ...common arguments (optional)
});  // returns promise

// get download authorization
b2.getDownloadAuthorization({
    bucketId: 'bucketId',
    fileNamePrefix: 'fileNamePrefix',
    validDurationInSeconds: 'validDurationInSeconds', // a number from 0 to 604800
    b2ContentDisposition: 'b2ContentDisposition'
    // ...common arguments (optional)
});  // returns promise

// download file by name
b2.downloadFileByName({
    bucketName: 'bucketName',
    fileName: 'fileName',
    responseType: 'arraybuffer', // options are as in axios: 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    onDownloadProgress: (event) => {} || null // progress monitoring
    // ...common arguments (optional)
});  // returns promise

// download file by fileId
b2.downloadFileById({
    fileId: 'fileId',
    responseType: 'arraybuffer', // options are as in axios: 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    onDownloadProgress: (event) => {} || null // progress monitoring
    // ...common arguments (optional)
});  // returns promise

// delete file version
b2.deleteFileVersion({
    fileId: 'fileId',
    fileName: 'fileName'
    // ...common arguments (optional)
});  // returns promise

// start large file
b2.startLargeFile({
    bucketId: process.env.BACKBLAZE_BUCKET_ID,
    fileName: 'fileName'
    // ...common arguments (optional)
}); // returns promise

// get upload part url
b2.getUploadPartUrl({
    fileId: 'fileId'
    // ...common arguments (optional)
}); // returns promise

// get upload part
b2.uploadPart({
    partNumber: 'partNumber', // A number from 1 to 10000
    uploadUrl: 'uploadUrl',
    uploadAuthToken: 'uploadAuthToken', // comes from getUploadPartUrl();
    data: Buffer, // this is expecting a Buffer not an encoded string,
    hash: 'sha1-hash', // optional data hash, will use sha1(data) if not provided
    onUploadProgress: (event) => {} || null, // progress monitoring
    contentLength: 0, // optional data length, will default to data.byteLength or data.length if not provided
    // ...common arguments (optional)
}); // returns promise

// finish large file
b2.finishLargeFile({
    fileId: 'fileId',
    partSha1Array: [partSha1Array] // array of sha1 for each part
    // ...common arguments (optional)
}); // returns promise

// cancel large file
b2.cancelLargeFile({
    fileId: 'fileId'
    // ...common arguments (optional)
}); // returns promise

// create key
b2.createKey({
    capabilities: [
        'readFiles',                    // option 1
        b2.KEY_CAPABILITIES.READ_FILES, // option 2
        // see https://www.backblaze.com/b2/docs/b2_create_key.html for full list
    ],
    keyName: 'my-key-1', // letters, numbers, and '-' only, <=100 chars
    validDurationInSeconds: 3600, // expire after duration (optional)
    bucketId: 'bucketId', // restrict access to bucket (optional)
    namePrefix: 'prefix_', // restrict access to file prefix (optional)
    // ...common arguments (optional)
});  // returns promise

// delete key
b2.deleteKey({
    applicationKeyId: process.env.BACKBLAZE_APPLICATION_KEY_ID,
    // ...common arguments (optional)
});  // returns promise

// list keys
b2.listKeys({
    maxKeyCount: 10, // limit number of keys returned (optional)
    startApplicationKeyId: '...', // use `nextApplicationKeyId` from previous response when `maxKeyCount` is set (optional)
    // ...common arguments (optional)
});  // returns promise

module.exports = b2;