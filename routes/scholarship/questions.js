const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter('http://103.163.111.39:3333/questions');

router.get('/', async (req, res) => {
    try {
        const questions = await api.get('/', {
            params: req.query,
        });
        return res.send(questions.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const question = await api.get(`/${req.params.id}`);
        return res.json(question.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.post('/', async (req, res) => {
    try {
        const question = await api.post('/', req.body);
        return res.json(question.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const question = await api.patch(`/${req.params.id}`, req.body);
        return res.json(question.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const question = await api.delete(`/${req.params.id}`);
        return res.json(question.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

module.exports = router;