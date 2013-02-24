Ext.define('AM.view.order.General', {
    extend:'Ext.panel.Panel',
    alias:'widget.ordergeneral',
    title:'订单总览',
    border:false,
    frame: true,
    items:[
        {
            xtype:'orderlist'
    }],
    buttons:[{
        text: '新增订单'
    },{
        text: '查看详情'
    }, {
        text: '变更订单'
    }]
});