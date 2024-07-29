const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.39:3033/');

router.get('/', async (req, res) => {
    try {
        const pmb = await api.get('/');
        return res.send(pmb.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.get('/download', async (req, res) => {
    try {
        const response = await api.get(`/download`, {
            params: req.query,
            responseType: 'stream'
        });
        res.setHeader('Content-Disposition', `attachment; filename="${req.query.filename}"`);
        return response.data.pipe(res);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.post('/upload', async (req, res) => {
    try {
        const pmb = await api.post('/upload', req.body);
        return res.json(pmb.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const pmb = await api.delete('/delete', { params: req.query });
        return res.json(pmb.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

module.exports = router;
