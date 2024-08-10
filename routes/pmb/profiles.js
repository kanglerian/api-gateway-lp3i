require('dotenv').config();
const { SERVICE_PMBONLINE } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter(`${SERVICE_PMBONLINE}/profiles`);

router.get('/v1', async (req, res) => {
  try {
    const response = await api.get('/v1',{
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    return res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else if (error.code === 'ERR_HTTP_INVALID_HEADER_VALUE') {
      return res.status(401).json({ status: 'error', message: 'Headers kosong!' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
});

module.exports = router;