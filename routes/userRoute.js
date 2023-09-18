const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello from users route',
    });
});

module.exports = router;
