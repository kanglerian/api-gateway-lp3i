const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.39:7666/');

router.get('/', async (req, res) => {
    try {
        const psikologi = await api.get('/');
        return res.send(psikologi.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.get('/token', async (req, res) => {
    try {
        const psikologi = await api.get('/token');
        return res.send(psikologi.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});


router.get('/users', async (req, res) => {
    try {
        const psikologi = await api.get('/users');
        return res.send(psikologi.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});


router.post('/users', async (req, res) => {
    try {
        const pskilogi = await api.post('/users', req.body);
        return res.json(pskilogi.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.post('/auth/login', async (req, res) => {
    try {
        const pskilogi = await api.post('/auth/login', req.body);
        return res.json(pskilogi.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});


router.get('/auth/logout', async (req, res) => {
    try {
        const psikologi = await api.delete('/auth');
        return res.send(psikologi.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

module.exports = router;
