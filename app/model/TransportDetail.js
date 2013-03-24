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
 deadline: 客户要求交货日期
 * */
Ext.define('AM.model.TransportDetail', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'orderId', 'materialCode', 'materialName', 'type', 'unit',
        'orderAmount', 'unitPrice', 'unitTaxPrice', 'price', 'taxPrice',
        {
            name: 'deadline',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        'transportAmount', 'boxType', 'boxAmount'
    ],

    reader: AM.Reader,
    belongsTo: 'AM.model.Transport'
});