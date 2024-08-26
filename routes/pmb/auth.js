require('dotenv').config();
const { SERVICE_PMBONLINE } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter(`${SERVICE_PMBONLINE}/auth`);

router.get('/', async (req, res) => {
  try {
    return res.send('Authentication PMB Online 🇮🇩');
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
})

/* Use for PPO */
router.post('/login/v1', async (req, res) => {
  try {
    const response = await api.post('/login/v1', req.body);
    res.cookie('refreshTokenPMBOnlineV1', response.data.refresh_token, {
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

/* Use for TGB, Psikotest */
router.post('/login/v2', async (req, res) => {
  try {
    const response = await api.post('/login/v2', req.body);
    res.cookie('refreshTokenPMBOnlineV2', response.data.refresh_token, {
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

/* Use for SBPMB */
router.post('/login/v3', async (req, res) => {
  try {
    const response = await api.post('/login/v3', req.body);
    res.cookie('refreshTokenPMBOnlineV3', response.data.refresh_token, {
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

/* Use for PPO */
router.post('/register/v1', async (req, res) => {
  try {
    const response = await api.post('/register/v1', req.body);
    res.cookie('refreshTokenPMBOnlineV1', response.data.refresh_token, {
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

/* Use for TGB, Psikotest */
router.post('/register/v2', async (req, res) => {
  try {
    const response = await api.post('/register/v2', req.body);
    res.cookie('refreshTokenPMBOnlineV2', response.data.refresh_token, {
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

/* Use for SBPMB */
router.post('/register/v3', async (req, res) => {
  try {
    const response = await api.post('/register/v3', req.body);
    res.cookie('refreshTokenPMBOnlineV3', response.data.refresh_token, {
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

router.post('/validation', async (req, res) => {
  try {
    const response = await api.post('/validation', req.body);
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

/* Use for PPO */
router.get('/token/v1', async (req, res) => {
  try {
    const refreshTokenPMBOnline = req.cookies.refreshTokenPMBOnlineV1;
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
        res.clearCookie('refreshTokenPMBOnlineV1');
      }
      return res.status(response.status).json(response.data);
    }
  }
})

/* Use for TGB, Psikotest */
router.get('/token/v2', async (req, res) => {
  try {
    const refreshTokenPMBOnline = req.cookies.refreshTokenPMBOnlineV2;
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
        res.clearCookie('refreshTokenPMBOnlineV2');
      }
      return res.status(response.status).json(response.data);
    }
  }
})

/* Use for SBPMB */
router.get('/token/v3', async (req, res) => {
  try {
    const refreshTokenPMBOnline = req.cookies.refreshTokenPMBOnlineV3;
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
        res.clearCookie('refreshTokenPMBOnlineV3');
      }
      return res.status(response.status).json(response.data);
    }
  }
})

/* Use for PPO */
router.delete('/logout/v1', async (req, res) => {
  try {
    const response = await api.delete('/logout/v1', {
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    res.clearCookie('refreshTokenPMBOnlineV1');
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

/* Use for TGB, Psikotest */
router.delete('/logout/v2', async (req, res) => {
  try {
    const response = await api.delete('/logout/v2', {
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    res.clearCookie('refreshTokenPMBOnlineV2');
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

/* Use for SBPMB */
router.delete('/logout/v3', async (req, res) => {
  try {
    const response = await api.delete('/logout/v3', {
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    res.clearCookie('refreshTokenPMBOnlineV3');
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