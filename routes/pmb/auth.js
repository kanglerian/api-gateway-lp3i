const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter('http://localhost:3106/auth');

router.get('/', async (req, res) => {
  try {
    return res.send('Authentication PMB Online 🇮🇩');
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else {
      return res.status(500).json({ error: "an error occurred on the server" });
    }
  }
})

router.post('/login', async (req, res) => {
  try {
    const response = await api.post('/login', req.body);
    res.cookie('refreshTokenPMBOnline', response.data.refresh_token, {
      httpOnly: true,
      secure: false,
    });
    return res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
})

router.get('/token', async (req, res) => {
  try {
    const refreshTokenPMBOnline = req.cookies.refreshTokenPMBOnline;
    if (!refreshTokenPMBOnline) {
      return res.status(400).json({
        status: 'error',
        message: 'invalid token'
      });
    }
    const response = await api.post('/token', {
      refreshToken: refreshTokenPMBOnline
    });
    return res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else {
      const response = error.response;
      if (response.status === 400 || response.status === 403) {
        res.clearCookie('refreshTokenPMBOnline');
      }
      return res.status(response.status).json(response.data);
    }
  }
})

router.delete('/logout', async (req, res) => {
  try {
    const response = await api.delete('/logout', {
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    res.clearCookie('refreshTokenPMBOnline');
    return res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else if (error.code === 'ERR_HTTP_INVALID_HEADER_VALUE') {
      return res.status(401).json({ status: 'error', message: 'headers is empty' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
})

module.exports = router;