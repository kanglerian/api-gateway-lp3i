require('dotenv').config();
const { SERVICE_HISTORY } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter(`${SERVICE_HISTORY}`);

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

router.get('/histories', async (req, res) => {
    try {
        const response = await api.get('/histories');
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

router.get('/:id', async (req, res) => {
    try {
        const response = await api.get(`/${req.params.id}`);
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

router.get('/phone/:phone', async (req, res) => {
    try {
        const response = await api.get(`/phone/${req.params.phone}`);
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

router.get('/count/:phone', async (req, res) => {
    try {
        const response = await api.get(`/count/${req.params.phone}`);
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

router.get('/detail/:pmb/:identity', async (req, res) => {
    try {
        const response = await api.get(`/detail/${req.params.pmb}/${req.params.identity}`);
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

router.post('/store', async (req, res) => {
    try {
        const response = await api.post('/store', req.body);
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

router.patch('/update/:phone', async (req, res) => {
    try {
        const response = await api.patch(`/update/${req.params.phone}`, req.body);
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

router.post('/update/:id', async (req, res) => {
    try {
        const response = await api.patch(`/${req.params.id}`, req.body);
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

router.post('/delete/:id', async (req, res) => {
    try {
        const response = await api.delete(`/${req.params.id}`);
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
