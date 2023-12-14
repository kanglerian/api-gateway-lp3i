const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.39:4003/');

router.get('/', async (req, res) => {
    try {
        const whatsapp = await api.get('/');
        return res.send(whatsapp.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.get('/report', async (req, res) => {
    try {
        const whatsapp = await api.get('/report');
        return res.json(whatsapp.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.post('/report', async (req, res) => {
    try {
        const whatsapp = await api.post('/report', req.body);
        return res.json(whatsapp.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

module.exports = router;