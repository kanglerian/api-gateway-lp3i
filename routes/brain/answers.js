require('dotenv').config();
const { SERVICE_BRAIN } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter(`${SERVICE_BRAIN}/answers`);

router.get('/', async (req, res) => {
    try {
        const answers = await api.get('/');
        return res.send(answers.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const answers = await api.get(`/${req.params.id}`);
        return res.json(answers.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.post('/', async (req, res) => {
    try {
        const answers = await api.post('/', req.body);
        return res.json(answers.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const answers = await api.patch(`/${req.params.id}`, req.body);
        return res.json(answers.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const answers = await api.delete(`/${req.params.id}`);
        return res.json(answers.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

module.exports = router;