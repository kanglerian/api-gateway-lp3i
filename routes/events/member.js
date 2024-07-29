const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter('http://103.163.111.39:3034/members');

router.get('/', async (req, res) => {
    try {
        const responses = await api.get('/');
        return res.send(responses.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.get('/report', async (req, res) => {
    try {
        await api.get('/report');
        return res.send('Terunduh!');
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.get('/find/:phone', async (req, res) => {
    try {
        const responses = await api.get(`/find/${req.params.phone}`);
        return res.json(responses.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.get('/presence/:phone', async (req, res) => {
  try {
      const responses = await api.get(`/presence/${req.params.phone}`);
      return res.json(responses.data);
  } catch (error) {
      if (error.code === 'ECONNREFUSED') {
          return res.status(500).json({ status: 'error', message: 'service unavailable' });
      }
      return res.status(500).json({ error: "an error occurred on the server" });
  }
});

router.get('/cancel/:phone', async (req, res) => {
  try {
      const responses = await api.get(`/cancel/${req.params.phone}`);
      return res.json(responses.data);
  } catch (error) {
      if (error.code === 'ECONNREFUSED') {
          return res.status(500).json({ status: 'error', message: 'service unavailable' });
      }
      return res.status(500).json({ error: "an error occurred on the server" });
  }
});

router.post('/', async (req, res) => {
    try {
        const responses = await api.post('/', req.body);
        return res.json(responses.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
}); 


module.exports = router;