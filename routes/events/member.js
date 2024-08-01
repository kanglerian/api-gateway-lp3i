require('dotenv').config();
const { SERVICE_EVENT } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter(`${SERVICE_EVENT}/members`);

router.get('/', async (req, res) => {
    try {
        const response = await api.get('/');
        return res.send(response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

router.get('/report', async (req, res) => {
    try {
        await api.get('/report');
        return res.send('Terunduh!');
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

router.get('/find/:phone', async (req, res) => {
    try {
        const response = await api.get(`/find/${req.params.phone}`);
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

router.get('/presence/:phone', async (req, res) => {
  try {
      const response = await api.get(`/presence/${req.params.phone}`);
      return res.json(response.data);
  } catch (error) {
      if (error.code === 'ECONNREFUSED') {
          return res.status(500).json({ status: 'error', message: 'service unavailable' });
      }
      return res.status(500).json({ error: "an error occurred on the server" });
  }
});

router.get('/cancel/:phone', async (req, res) => {
  try {
      const response = await api.get(`/cancel/${req.params.phone}`);
      return res.json(response.data);
  } catch (error) {
      if (error.code === 'ECONNREFUSED') {
          return res.status(500).json({ status: 'error', message: 'service unavailable' });
      }
      return res.status(500).json({ error: "an error occurred on the server" });
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


module.exports = router;