const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter('http://103.163.111.39:3333/histories');

router.get('/', async (req, res) => {
    try {
        const histories = await api.get('/', {
            params: req.query,
        });
        return res.send(histories.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const history = await api.get(`/${req.params.id}`);
        return res.json(history.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.post('/', async (req, res) => {
    try {
        const history = await api.post('/', req.body);
        return res.json(history.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const history = await api.patch(`/${req.params.id}`, req.body);
        return res.json(history.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const history = await api.delete(`/${req.params.id}`);
        return res.json(history.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

module.exports = router;