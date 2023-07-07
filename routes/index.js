const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send('API Gateway LP3I Jenkins 6 🇮🇩');
});

module.exports = router;
