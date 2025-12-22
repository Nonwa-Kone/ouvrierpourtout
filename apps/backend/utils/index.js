const { default: mongoose } = require('mongoose');

function refArray(path) {
  return Array({
    type: mongoose.Types.ObjectId,
    ref: path,
  });
}

function PersonalInfos() {
  return {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  };
}

function Adresse() {
  return {
    city: {
      type: String,
      required: true,
    },
    commune: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  };
}

function generateReference(initial, length = 14) {
  // const upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // const upperAlpha = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
  // const lowerApha = upperAlpha.toLowerCase();
  const digit = '0123456789';
  // const string = upperAlpha + lowerApha + digit;
  let reference = '';
  for (let i = 0; i < length; i++) {
    const indexAleatoire = Math.floor(Math.random() * digit.length);
    reference += digit[indexAleatoire];
  }
  return `${initial}${reference}`;
}

module.exports = {
  refArray,
  generateReference,
  Adresse,
  PersonalInfos,
};
