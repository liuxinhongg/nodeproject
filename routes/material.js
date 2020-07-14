const express = require('express');
const router = express.Router();
var materialplan = require('../controller/material/totleplan')
    //材料总计划的新增
router.get('/insert', materialplan.material_insert);
router.get('/update', materialplan.material_update);
router.get('/delete/:prjid', materialplan.material_delete);

module.exports = router;