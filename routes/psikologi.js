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
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken);
    // try {
    //     const refreshToken = req.cookies.refreshToken;
    //     const psikologi = await api.post('/token', refreshToken);
    //     return res.send(psikologi.data);
    // } catch (error) {
    //     if (error.code === 'ECONNREFUSED') {
    //         return res.status(500).json({ status: 'error', message: 'service unavailable' });
    //     }
    //     const { status, data } = error.response;
    //     return res.status(status).json(data);
    // }
});

router.get('/users', async (req, res) => {
    try {
        const token = req.headers['authorization'];
        // Memeriksa apakah token akses ada dalam header permintaan
        if (!token) {
            return res.status(401).json({ message: 'Token akses tidak ditemukan' });
        }
        const psikologi = await api.get('/users', {
            headers: {
                'Authorization': token,
            }
        });
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
        const psikologi = await api.post('/auth/login', req.body);
        res.cookie('refreshToken', psikologi.data.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true,
        });
        return res.json(psikologi.data);
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
