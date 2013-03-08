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
    fields:['id', 'project',
        {
            name:'date',
            type: 'date',
            dateFormat: 'Y-m-d'
        },
        'custom','sale_group', 'salesman', 'total_price', 'status'],

    hasMany:{
        model: 'AM.model.OrderDetail',
        foreignKey: 'order_id',
        associationKey: 'detail',
        name: 'detail'
    }
});