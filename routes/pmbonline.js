require('dotenv').config();
const { SERVICE_PMB } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter(`${SERVICE_PMB}`);

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
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

router.post('/upload', async (req, res) => {
    try {
        const pmb = await api.post('/upload', req.body);
        return res.json(pmb.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const pmb = await api.delete('/delete', { params: req.query });
        return res.json(pmb.data);
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
