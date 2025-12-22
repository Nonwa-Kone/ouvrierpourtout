const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    personalInfos: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      gender: { type: String, required: true },
      email: { type: String, required: true },
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    role: {
      label: { type: String, required: true },
      description: { type: String, required: true },
      permissions: [
        {
          label: { type: String, required: true, default: 'ok' },
          value: { type: String, required: true, default: 'ok' },
          enabled: { type: Boolean, required: true, default: false },
        },
      ],
    },
    token: { type: String, required: false, default: '' },
    password: { type: String, required: true },
    isFirstLogin: { type: Boolean, required: true, default: true },
    isActive: { type: Boolean, required: true, default: false },
    isLogged: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, collection: 'Admin' }
);

AdminSchema.virtual('fullName').get(function () {
  return `${this.personalInfos.firstName} ${this.personalInfos.lastName}`;
});

module.exports = mongoose.model('Admin', AdminSchema);
