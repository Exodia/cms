/*
 *订单*
 id: 订单号
 project: 项目号
 date: 订单日期
 custom: 订货客户
 sale_group: 销售组
 salesman: 销售员
 detail: 订单详情
 */
Ext.define('AM.model.Order', {
    extend:'Ext.data.Model',
    fields:[
        'id', 'project',  'orderCode',
        {
            name:'date',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        'customId', 'customCompany',
        'saleGroup', 'salesManId', 'salesManName', 'salesManContact',
        'totalPrice', 'status'
    ],

    proxy: {
        type: 'ajax',
        api: AM.API['order'],
        listeners: AM.ProxyListeners,
        reader: AM.Reader,
        writer: AM.Writer
    },

    hasMany:[{
        model: 'AM.model.OrderDetail',
        foreignKey: 'orderId',
        associationKey: 'orderId',
        name: 'detail'
    }, {
        model: 'AM.model.HistoryDetail',
        foreignKey: 'orderId',
        associationKey: 'orderId',
        name: 'history'
    }],
    hasOne: {
        model: 'AM.model.Custom',
        foreignKey: 'customId',
        associationKey: 'customId',
        getterName: 'Custom'
    }
});