const express = require('express');
const router = express.Router();
var materialplan = require('../controller/material/materialPlan/totleplan');
var needplan = require('../controller/material/materialPlan/needplan');
//材料总计划的新增
router.get('/totleplan/search', materialplan.material_search);
router.get('/totleplan/insert', materialplan.material_insert);
router.get('/totleplan/update', materialplan.material_update);
router.get('/totleplan/delete/:prjid', materialplan.material_delete);
//材料需用计划
router.get('/need/search', needplan.need_search);
router.get('/need/insert', needplan.need_insert);
router.get('/need/update', needplan.need_update);
router.get('/need/delete/:prjid', needplan.need_delete);
module.exports = router;