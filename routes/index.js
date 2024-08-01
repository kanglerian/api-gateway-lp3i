const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send('API Gateway LP3I 🇮🇩');
});

router.get('/login', function(req, res, next) {
    res.send('Mau login? Gak boleh kata mbil 🗿');
});

module.exports = router;
