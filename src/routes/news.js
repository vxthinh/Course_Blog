const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewController');

router.get('/:slug', newsController.show);
router.get('/', newsController.news);

module.exports = router;
