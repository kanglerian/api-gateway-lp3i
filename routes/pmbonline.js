const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.39:3033/');

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

router.get('/download/:identity/:namefile', async (req, res) => {
    try {
        const response = await api.get(`/download/${req.params.identity}/${req.params.namefile}`, {
            responseType: 'stream' // Menentukan responseType sebagai 'stream' agar dapat mengirimkan file sebagai respon
        });
        res.setHeader('Content-Disposition', `attachment; filename="${req.params.namefile}"`);
        return response.data.pipe(res);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.post('/pmbupload', async (req, res) => {
    try {
        const pmb = await api.post('/pmbupload', req.body);
        console.log(req.body);
        return res.json(pmb.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.delete('/pmbupload', async (req, res) => {
    try {
        console.log(req.body);
        const pmb = await api.delete('/pmbupload', req.body);
        return res.json(pmb.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

module.exports = router;
