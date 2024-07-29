const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.39:4002/');

router.get('/', async (req, res) => {
    try {
        const whatsapp = await api.get('/');
        return res.send(whatsapp.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.post('/send', async (req, res) => {
    try {
        const whatsapp = await api.post('/send', req.body);
        return res.json(whatsapp.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.post('/send-general', async (req, res) => {
    try {
        const result = await api.post('/send-general', req.body);
        return res.json(result.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
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
        return res.status(500).json({ error: "an error occurred on the server" });
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
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

module.exports = router;