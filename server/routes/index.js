'use strict';
const router = require('express').Router();

router.get('/health', (req, res) => res.sendStatus(200));

exports = module.exports = router;
