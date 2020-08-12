const express = require('express');
const router = express.Router();
var materialplan = require('../controller/material/materialPlan/totleplan');
var needplan = require('../controller/material/materialPlan/needplan');
var pact = require('../controller/material/materialPlan/pact');
var Vendor = require("../controller/material/VendorController/vendorconfig"); //导入供应商
var Basicmaterials = require("../controller/material/BasicMaterialsController/basicmaterials"); //导入基础物资
var Admission = require('../controller/material/materialrcDetail/admission.js');
var Delivery = require('../controller/material/materialrcDetail/delivery');
var content = require('../controller/material/materialrcDetail/content');
var Materialstore = require('../controller/material/contractStore/store.js')
var operContract = require('../controller/material/contractStore/contract.js');
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
// 合同配置
router.get("/pact/search", pact.pact_search);
router.get("/pact/insert", pact.pact_insert);
router.get("/pact/update", pact.pact_update);
router.get("/pact/delete/:prj_id", pact.pact_delete);

// 供应商配置路由
router.get('/vendor/add', Vendor.vendorAdd) //具体实现在VendorController层
router.get('/vendor/findone', Vendor.findVendorByName)
router.get('/vendor/update', Vendor.updateVendor)
router.get('/vendor/delete', Vendor.deleteVendor)
// 基础物资管理路由
router.get('/basicmaterials/add', Basicmaterials.basicMaterialsAdd) //具体实现在BasicMaterialsController层
router.get('/basicmaterials/findone', Basicmaterials.findBasicMaterialsById)
router.get('/basicmaterials/update', Basicmaterials.updateBasicMaterials)
router.get('/basicmaterials/delete', Basicmaterials.deleteBasicMaterials)
// 材料入场
router.get('/admission/add', Admission.Admission.add);
router.get('/admission/del', Admission.Admission.del);
router.get('/admission/search', Admission.Admission.search);
router.get('/admission/update', Admission.Admission.update);
// 材料出库
router.get('/delivery/add',Delivery.Delivery.add);
router.get('/delivery/del',Delivery.Delivery.del);
router.get('/delivery/find',Delivery.Delivery.find);
router.get('/delivery/update',Delivery.Delivery.update);
// 材料盘点
router.get('/content/add',content.Content.add);
router.get('/content/del',content.Content.del);
router.get('/content/find',content.Content.find);
router.get('/content/update',content.Content.update);
//合同
// 添加
router.get('/contract/insert', operContract.operAdd);
// 查询
router.get('/contract/select', operContract.operFind);
// 删除
router.get('/contract/delete', operContract.operDel);
// 修改
router.get('/contract/update', operContract.operUpdate);
//仓库
//添加
router.get('/Warehouse/insert', Materialstore.material_info)
//查询
router.get('/Warehouse/select', Materialstore.material_update)
//删除
router.get('/Warehouse/delete', Materialstore.material_delete)
//修改
router.get('/Warehouse/update', Materialstore.material_register)
module.exports = router;