const { default: axios } = require('axios');
require('dotenv').config();

const order = {
  createOrderFromApi: async (data) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/order`, data);
      return response;
    } catch (error) {
      console.log('🚀 ~ createDocument ~ error:', error);
      return error;
    }
  },
};

module.exports = order;
