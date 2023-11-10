const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter('http://103.163.111.39:3333/categories');

router.get('/', async (req, res) => {
    try {
        const categories = await api.get('/');
        return res.send(categories.data);
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
        const category = await api.get(`/${req.params.id}`);
        return res.json(category.data);
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
        const category = await api.post('/', req.body);
        return res.json(category.data);
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
        const category = await api.patch(`/${req.params.id}`, req.body);
        return res.json(category.data);
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
        const category = await api.delete(`/${req.params.id}`);
        return res.json(category.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

module.exports = router;