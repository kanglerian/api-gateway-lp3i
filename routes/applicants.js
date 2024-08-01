require('dotenv').config();
const { SERVICE_APPLICANT } = process.env;
const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter(`${SERVICE_APPLICANT}`);

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

router.post('/sync', async (req, res) => {
    try {
        const response = await api.post(`/applicants/sync`, req.body);
        return res.json(response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        console.log(error);
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

module.exports = router;
