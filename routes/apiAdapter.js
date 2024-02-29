const axios = require('axios');
module.exports = (baseUrl) => {
    return axios.create({
        baseURL: baseUrl,
        timeout: parseInt(1800000),
        headers: {
            'Content-Type': 'application/json',
          },
    });
}