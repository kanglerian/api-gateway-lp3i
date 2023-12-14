const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.39:3002/');

router.get('/', async (req, res) => {
    try {
        const provinces = await api.get('/');
        return res.send(provinces.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.get('/provinces', async (req, res) => {
    try {
        const provinces = await api.get('/provinces');
        return res.json(provinces.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.get('/regencies/:id', async (req, res) => {
    try {
        const regencies = await api.get(`/regencies/${req.params.id}`);
        return res.json(regencies.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.get('/districts/:id', async (req, res) => {
    try {
        const districts = await api.get(`/districts/${req.params.id}`);
        return res.json(districts.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.get('/villages/:id', async (req, res) => {
    try {
        const villages = await api.get(`/villages/${req.params.id}`);
        return res.json(villages.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

module.exports = router;