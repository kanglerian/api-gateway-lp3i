const express = require('express');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter('http://103.163.111.39:7001/');

router.get('/', async (req, res) => {
    try {
        const whatsapp = await api.get('/');
        return res.send(whatsapp.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

module.exports = router;