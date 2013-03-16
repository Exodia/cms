/*
 * 订单详情
 id:
 order_id: 所属订单id
 material_code:   物质编码
 material_name:  物料名称
 type:           规格型号
 unit: 单位
 amount:  数量
 unit_price: 单价
 unit_tax_price: 含税单价
 * */
Ext.define('AM.model.ContractDetail', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'orderCode', 'contractId', 'materialCode', 'materialName', 'type', 'unit',
        'amount', 'remainAmount', 'unitPrice', 'unitTaxPrice'],

    proxy: AM.createProxy('contractDetial'),

    belongsTo: 'AM.model.Contract'
});