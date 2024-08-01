require('dotenv').config();
const { SERVICE_REGION } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter(`${SERVICE_REGION}`);

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

router.get('/provinces', async (req, res) => {
    try {
        const response = await api.get('/provinces');
        return res.json(response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

router.get('/regencies/:id', async (req, res) => {
    try {
        const response = await api.get(`/regencies/${req.params.id}`);
        return res.json(response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

router.get('/districts/:id', async (req, res) => {
    try {
        const response = await api.get(`/districts/${req.params.id}`);
        return res.json(response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

router.get('/villages/:id', async (req, res) => {
    try {
        const response = await api.get(`/villages/${req.params.id}`);
        return res.json(response.data);
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