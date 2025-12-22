const mongoose = require('mongoose');

let isConnected;

const connect = async () => {
  if (isConnected) {
    console.log('Connexion MongoDB déjà active');
    return;
  }

  try {
    const db = await mongoose.connect('mongodb://mongo:27017/ouvrier_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log('Connexion MongoDB établie');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error.message);
    throw error;
  }
};

module.exports = { connect };

// module.exports = { connect };

// function getConfig() {
//   return {
//     mongodb: {
//       url: process.env.MONGODB_URL_ONLINE,
//       options: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//     },
//   };
// }

// function getMongoose() {
//   return {
//     connection: getConfig().mongodb.url,
//     options: getConfig().mongodb.options,
//   };
// }

// async function connect() {
//   try {
//     await mongoose.connect(getMongoose().connection, getMongoose().options);
//     // Initialiser le replica set s'il n'est pas déjà configuré
//     // const admin = new mongoose.mongo.Admin(mongoose.connection.db);
//     // admin.command({ replSetGetStatus: 1 }, (err, info) => {
//     //   if (err && err.code === 94) {
//     //     // Code 94 : replica set non configuré
//     //     mongoose.connection.db
//     //       .admin()
//     //       .command({
//     //         replSetInitiate: {},
//     //       })
//     //       .then(() => {
//     //         console.log('Replica set initialisé avec succès');
//     //       })
//     //       .catch((initErr) => {
//     //         console.error(
//     //           "Erreur lors de l'initialisation du replica set :",
//     //           initErr
//     //         );
//     //       });
//     //   } else if (err) {
//     //     console.error(
//     //       'Erreur lors de la vérification du statut du replica set :',
//     //       err
//     //     );
//     //   } else {
//     //     console.log('Replica set déjà configuré');
//     //   }
//     // });
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = {
//   getConfig,
//   getMongoose,
//   connect,
// };
