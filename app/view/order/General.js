Ext.define('AM.view.order.General', {
    extend:'Ext.panel.Panel',
    requires:['AM.view.order.List'],
    alias:'widget.ordergeneral',
    title:'订单总览',
    border:false,
    frame: true,
    items:[
        {
            xtype:'orderlist'
    }],
    buttons:[{
        text: '新增订单',
        itemId: 'J_OrderAdd'
    },{
        text: '查看详情',
        itemId: 'J_OrderView',
        disabled: true
    }, {
        text: '变更订单',
        itemId: 'J_OrderEdit',
        disabled: true
    }]
});