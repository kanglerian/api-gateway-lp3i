require('dotenv').config();
const { SERVICE_MISIL } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter(`${SERVICE_MISIL}`);

router.get('/', async (req, res) => {
    try {
        return res.send('Misil V4');
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

router.post('/token', async (req, res) => {
    try {
        const response = await api.post('/service/auth/sign-in', req.body);
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

router.post('/integration', async (req, res) => {
    try {
        let data = req.body;
        const response = await api.post('/service/integration/marketing/save-aplikan', data[0], {
            headers: data[1],
        });
        return res.json(response.data);
    } catch (error) {
        console.log(error);
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

module.exports = router;