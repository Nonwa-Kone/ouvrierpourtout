const mongoose = require('mongoose');
const { addressSchema } = require('../../utils/schemaFactroy');

const customerSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      // unique: true,
    },
    firstName: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le nom ne doit pas dépasser 50 caractères'],
    },
    lastName: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
      minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le prénom ne doit pas dépasser 50 caractères'],
    },

    gender: {
      type: String,
      required: true,
      enum: ['man', 'woman'],
      default: 'man',
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      // validate: {
      //   validator: function (v) {
      //     return /\d{10}/.test(v); // Exemple de validation de 10 chiffres
      //   },
      //   message: (props) => `${props.value} is not a valid phone number!`,
      // },
    },
    address: addressSchema(),
  },
  { timestamps: true, collection: 'customers' }
);
module.exports = mongoose.model('Customer', customerSchema);
