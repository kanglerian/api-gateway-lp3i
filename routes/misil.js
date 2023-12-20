const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.45:8000');

router.get('/', async (req, res) => {
    try {
        return res.send('Misil V4');
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.post('/token', async (req, res) => {
    try {
        const misil = await api.post('/service/auth/sign-in', req.body);
        return res.json(misil.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.post('/integration', async (req, res) => {
    try {
        let data = req.body;
        const misil = await api.post('/service/integration/marketing/save-aplikan', data[0], {
            headers: data[1],
          });
        return res.json(misil.data);
    } catch (error) {
        console.log(error);
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

module.exports = router;