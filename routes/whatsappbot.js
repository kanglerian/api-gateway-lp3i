const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.110.11:4002/');

router.get('/', async(req, res) => {
  try {
      const whatsapp = await api.get('/');
      return res.send(whatsapp.data);
  } catch (error) {
      if(error.code === 'ECONNREFUSED'){
          return res.status(500).json({ status: 'error', message: 'service unavailable' });
      }
      const { status, data } = error.response;
      return res.status(status).json(data);
  }
});

router.post('/send', async(req, res) => {
    try {
        const whatsapp = await api.post('/send', req.body);
        return res.json(whatsapp.data);
    } catch (error) {
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
  });

module.exports = router;