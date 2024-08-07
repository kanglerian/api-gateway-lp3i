require('dotenv').config();
const { SERVICE_DASHBOARD } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter(`${SERVICE_DASHBOARD}/programs`);

router.get('/', async (req, res) => {
  try {
    const response = await api.get('/');
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
});

router.get('/interest', async (req, res) => {
  try {
    const response = await api.get('/interest');
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
});

router.post('/', async (req, res) => {
  try {
    const response = await api.post('/', req.body);
    return res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
});

router.post('/interest', async (req, res) => {
  try {
    const response = await api.post('/interest', req.body);
    return res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
});

module.exports = router;