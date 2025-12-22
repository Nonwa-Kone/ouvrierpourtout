const mongoose = require('mongoose');
const { Schema } = mongoose;

const personalInfosSchema = function () {
  return {
    firstName: {
      type: String,
      upper: true,
      required: true,
      minLength: [2, 'Le prénom doit contenir au moins 2 caractères'],
      maxLength: [50, 'Le prénom doit contenir au plus 50 caractères'],
    },
    lastName: {
      type: String,
      upper: true,
      required: true,
      minLength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxLength: [50, 'Le nom doit contenir au plus 50 caractères'],
    },
    birthDay: {
      type: String,
      required: false,
    },
    locateDay: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
      minLength: [10, 'Le numéro de téléphone doit contenir 10 caractères'],
      maxLength: [10, 'Le numéro de téléphone doit contenir 10 caractères'],
      validate: {
        validator: function (v) {
          return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(v);
        },
        message: (props) =>
          `${props.value} n'est pas un numéro de téléphone valide`,
      },
    },
    email: {
      type: String,
      required: false,
      unique: true,
      minLength: [5, "L'adresse email doit contenir au moins 5 caractères"],
      maxLength: [100, "L'adresse email doit contenir au plus 100 caractères"],
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: (props) => `${props.value} n'est pas une adresse email valide`,
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ['man', 'woman', 'other'],
    },
    familySituation: {
      type: String,
      required: true,
      enum: ['Marié', 'Célibataire', 'Vie maritale'],
    },
    numberOfChildren: {
      type: String,
      required: false,
    },
  };
};

const addressSchema = function () {
  return {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    municipality: {
      //Commune
      type: String,
      lower: true,
      trim: true,
      required: [
        true,
        'Vous devez renseigné les informations sur la municipalité',
      ],
      minLength: [
        5,
        'Le nom de la municipalité doit contenir au moins 5 caractères',
      ],
      maxLength: [
        50,
        'Le nom de la municipalité doit contenir au plus 50 caractères',
      ],
    },
    villa: {
      //N° Villa
      type: String,
      required: false,
    },
  };
};

const professionSchema = function () {
  return {
    jobs: {
      // Métier
      type: String,
      required: true,
    },
    speciality: {
      // Spécialité
      type: String,
      required: false,
    },
    diploma: {
      // Diplome
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
      default: '0 années',
    },
    availability: {
      // Disponibilité
      type: String,
      required: true,
      default: 'Indisponible',
      enum: ['Indisponible', 'Disponible', 'En recherche'],
    },
  };
};

const nationaltySchema = function () {
  return {
    //Nationalité
    type: String,
    required: false,
  };
};

const contractSchema = function () {
  return {
    typeOfContract: {
      type: String,
      required: true,
      enum: [
        'Collaborateur freelance',
        'Partenariat',
        'Contrat de professionnalisation',
        'CDD',
        'CDI',
        'Autre',
      ],
    },
    referenceContract: {
      type: String,
      required: true,
      minLength: [8, 'Le numéro de contrat doit contenir 8 caractères'],
      maxLength: [8, 'Le numéro de contrat doit contenir 8 caractères'],
    },
    remuneration: {
      type: String,
      enum: ['Par semaine', 'Par quinzaine', 'Par mois', 'Par opération'],
      required: true,
    },
  };
};

const documentSchema = function () {
  return {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  };
};

module.exports = {
  personalInfosSchema,
  addressSchema,
  professionSchema,
  nationaltySchema,
  contractSchema,
  documentSchema,
};
