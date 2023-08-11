const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const api = apiAdapter('http://103.163.111.39:7654');

router.get('/', async (req, res) => {
    try {
        const paud = await api.get('/');
        return res.send(paud.data);
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
        const paud = await api.get('/users');
        return res.send(paud.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
});

router.post('/login', async (req, res) => {
    try {
        await api.post('/login', req.body)
            .then((response) => {
                console.log(response.data)
                res.cookie('paudRefreshToken', response.data.refreshToken, {
                    maxAge: 3600000, // 1 hour
                    httpOnly: true, // Cookie can't be accessed by JavaScript
                    secure: false, // Send only over HTTPS
                    // sameSite: 'none'
                });
                return res.json({
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                });
            })
            .catch((error) => {
                console.log(error.message)
            });
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.send(error.response);
    }
});

router.get('/token', async (req, res) => {
    try {
        const cookieValue = req.cookies.paudRefreshToken;
        if (cookieValue) {
            res.send(`Cookie value: ${cookieValue}`);
        } else {
            res.send('Cookie not found');
        }
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.send(error.response);
    }
});

router.get('/protected', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = {
            token: token
        }
        const paud = await api.post('/protected', data);
        return res.send(paud.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.send(error.response);
    }
});

router.get('/refresh', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = {
            token: token
        }
        const paud = await api.post('/refresh', data);
        return res.send(paud.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.send(error.response);
    }
});

router.get('/logout', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = {
            token: token
        }
        const paud = await api.post('/logout', data);
        res.send(paud.data);
        return res.clearCookie('paudRefreshToken');
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.send(error.response);
    }
})

module.exports = router;
