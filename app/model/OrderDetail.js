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
Ext.define('AM.model.OrderDetail', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'orderId', 'orderCode', 'materialCode', 'materialName', 'type', 'unit',
        'amount', 'unitPrice', 'unitTaxPrice', 'price', 'taxPrice',
        {
            name: 'deadline',
            type: 'date',
            dateFormat: 'Y-m-d'
        }
    ],

    proxy: {
        type: 'ajax',
        api: AM.API['orderDetail'],
        listeners: AM.ProxyListeners,
        filterParam: undefined,
        reader: AM.Reader
    },

    belongsTo: 'AM.model.Order'
});

Ext.define('AM.model.HistoryDetail', {
    extend: 'AM.model.OrderDetail',

    proxy: {
        type: 'ajax',
        api: AM.API['historyDetail'],
        listeners: AM.ProxyListeners,
        filterParam: undefined,
        extraParams: {
          history: true
        },
        reader: AM.Reader
    }

});