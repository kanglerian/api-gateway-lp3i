require('dotenv').config();
const { SERVICE_PMBONLINE } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter(`${SERVICE_PMBONLINE}/organizations`);

router.get('/:identityUser', async (req, res) => {
  try {
    const response = await api.get(`/${req.params.identityUser}`,{
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    return res.status(200).json(response.data);
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

router.post('/', async (req, res) => {
  try {
    const response = await api.post('/', req.body, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    return res.status(200).json(response.data);
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

router.patch('/:id', async (req, res) => {
  try {
    const response = await api.patch(`/${req.params.id}`, req.body, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    return res.status(200).json(response.data);
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

router.delete('/:id', async (req, res) => {
  try {
    const response = await api.delete(`/${req.params.id}`,{
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    return res.status(200).json(response.data);
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