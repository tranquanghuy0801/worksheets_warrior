const express = require('express');
const router = express.Router();
const descriptorThirdController = require('../controller/descriptorSecond');

router.get('/', descriptorThirdController.getAll);
router.post('/by-first-descriptor', descriptorThirdController.getByDescriptorFirst);

module.exports = router;