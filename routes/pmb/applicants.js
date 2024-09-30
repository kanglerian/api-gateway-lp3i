require('dotenv').config();
const { SERVICE_PMBONLINE } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');
const api = apiAdapter(`${SERVICE_PMBONLINE}/applicants`);

router.get('/', async (req, res) => {
  try {
    const response = await api.get('/',{
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else if (error.code === 'ERR_HTTP_INVALID_HEADER_VALUE') {
      return res.status(401).json({ status: 'error', message: 'Headers are missing!' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
});

router.get('/:identity', async (req, res) => {
  try {
    const response = await api.get(`/${req.params.identity}`,{
      headers: {
        'lp3i-api-key': req.headers['lp3i-api-key'],
      }
    });
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else if (error.code === 'ERR_HTTP_INVALID_HEADER_VALUE') {
      return res.status(401).json({ status: 'error', message: 'Headers are missing!' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
});

/* Use for PPO */
router.patch('/update/v1/:identity', async (req, res) => {
  try {
    const response = await api.patch(`/update/v1/${req.params.identity}`, req.body, {
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    return res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else if (error.code === 'ERR_HTTP_INVALID_HEADER_VALUE') {
      return res.status(401).json({ status: 'error', message: 'Headers are missing!' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    } 
  }
});

/* Use for PPO */
router.patch('/updateprodi/v1/:identity', async (req, res) => {
  try {
    const response = await api.patch(`/updateprodi/v1/${req.params.identity}`, req.body, {
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    return res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else if (error.code === 'ERR_HTTP_INVALID_HEADER_VALUE') {
      return res.status(401).json({ status: 'error', message: 'Headers are missing!' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
});

/* Use for PPO */
router.patch('/updatefamily/v1/:identity', async (req, res) => {
  try {
    const response = await api.patch(`/updatefamily/v1/${req.params.identity}`, req.body, {
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    return res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    } else if (error.code === 'ERR_HTTP_INVALID_HEADER_VALUE') {
      return res.status(401).json({ status: 'error', message: 'Headers are missing!' });
    } else {
      const response = error.response;
      return res.status(response.status).json(response.data);
    }
  }
});

module.exports = router;