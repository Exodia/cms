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
        'id', 'project',
        {
            name:'date',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        'customId', 'customCompany',
        'saleGroup', 'salesManId', 'salesManName', 'salesManContact',
        'total_price', 'status'
    ],

    proxy: {
        type: 'ajax',
        api: AM.API['order'],
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            encode: true
        }
    },

    hasMany:{
        model: 'AM.model.OrderDetail',
        foreignKey: 'order_id',
        associationKey: 'detail',
        name: 'detail'
    },
    hasOne: {
        model: 'AM.model.Custom',
        foreignKey: 'customId',
        associationKey: 'customId',
        getterName: 'Custom'
    }
});