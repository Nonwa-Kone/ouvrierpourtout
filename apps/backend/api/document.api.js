const { default: axios } = require('axios');
require('dotenv').config();

const document = {
  // getDocuments: async () => {
  //   try {
  //     return await axios.get(`${process.env.API_URL}/document`, {});
  //   } catch (error) {
  //     console.log('🚀 ~ getDocuments ~ error:', error);
  //     return error;
  //   }
  //   // return await axios.get(`${process.env.API_URL}/document`, {});
  // },
  // getDocument: async (id) => {
  //   return await axios.get(`${process.env.API_URL}/document/${id}`, {});
  // },
  createDocument: async (ownerId) => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/document/${ownerId}`
      );
      return response;
    } catch (error) {
      console.log('🚀 ~ createDocument ~ error:', error);
      return error;
    }
  },
  // updateDocument: async (id, data) => {
  //   return await axios.put(`${process.env.API_URL}/document/${id}`, data, {});
  // },
  // deleteDocument: async (id) => {
  //   return await axios.delete(`${process.env.API_URL}/document/${id}`, {});
  // },
};

module.exports = document;
