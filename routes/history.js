const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.39:4004/');

router.get('/', async (req, res) => {
    try {
        const pmb = await api.get('/');
        return res.send(pmb.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.get('/histories', async (req, res) => {
    try {
        const pmb = await api.get('/histories');
        return res.json(pmb.data);
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
        const pmb = await api.get(`/history/${req.params.id}`);
        return res.json(pmb);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.get('/phone/:phone', async (req, res) => {
    try {
        const pmb = await api.get(`/history/phone/${req.params.phone}`);
        return res.json(pmb);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.post('/store', async (req, res) => {
    try {
        const pmb = await api.post('/store', req.body);
        return res.json(pmb);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

module.exports = router;
