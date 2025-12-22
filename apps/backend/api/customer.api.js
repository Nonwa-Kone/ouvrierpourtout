const { default: axios } = require('axios');
require('dotenv').config();

module.exports = {
  createCustomerApi: async (body) => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/customer/create`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
  findCustomerByEmailApi: async (query) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/customer/findByEmail`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: query,
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
  findCustomerByPhoneNumberApi: async (query) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/customer/findByPhoneNumber`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: query,
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
