const mongoose = require('mongoose');
const { refArray, generateReference } = require('../../utils');
const {
  professionSchema,
  personalInfosSchema,
  addressSchema,
  nationaltySchema,
  contractSchema,
} = require('../../utils/schemaFactroy');
const Schema = mongoose.Schema;

const ouvriersSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
      default: generateReference(),
      minLength: [8, 'la référence doit contenir 8 caractères'],
      maxLength: [8, 'la référence doit contenir 8 caractères'],
      unique: true,
      upper: true,
    },
    profFile: {
      fileUrl: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
    },
    realization: [
      {
        fileUrl: {
          type: String,
          required: false,
        },
        fileName: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
      },
    ],
    personalInfos: personalInfosSchema(),
    businessInfos: {
      rccm: {
        type: String,
        required: false,
        default: '',
        unique: true,
        upper: true,
      },
      rcs: {
        type: String,
        required: false,
        default: '',
        unique: true,
        upper: true,
      },
    },
    address: addressSchema(),
    profession: professionSchema(),
    nationality: nationaltySchema(),
    contract: contractSchema(),
    password: {
      type: String,
      required: true,
    },
    documentInfos: {
      cni: {
        type: String,
        required: false,
        default: '',
        unique: true,
        upper: true,
      },
      cmu: {
        type: String,
        required: false,
        default: '',
        unique: true,
        upper: true,
      },
      sejour: {
        type: String,
        required: false,
        default: '',
        unique: true,
        upper: true,
      },
    },
    document: refArray('Document'),
    token: { type: String, required: false, default: '' },
    password: { type: String, required: true },
    isFirstLogin: { type: Boolean, required: true, default: true },
    isActive: { type: Boolean, required: true, default: false },
    isLogged: { type: Boolean, required: true, default: false },
    assignTo: refArray('Order'),
  },
  { timestamps: true, collection: 'ouvriers' }
);

ouvriersSchema.virtual('fullName').get(function () {
  return `${this.personalInfos.firstName} ${this.personalInfos.lastName}`;
});

module.exports = mongoose.model('ouvriers', ouvriersSchema);
