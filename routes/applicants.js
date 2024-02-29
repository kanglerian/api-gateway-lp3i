const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.39:3032/');

router.get('/', async (req, res) => {
    try {
        const pmb = await api.get('/');
        return res.send(pmb.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
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
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

module.exports = router;
