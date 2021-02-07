const express = require('express');
const router = express.Router();
const descriptorFirstController = require('../controller/descriptorFirst');

router.get('/', descriptorFirstController.getAll);
router.post('/by-category-grade', descriptorFirstController.getByCategoryAndGrade);

module.exports = router;