Ext.define('AM.view.order.Panel', {
    extend:'Ext.tab.Panel',
    requires:['AM.view.order.General', 'AM.view.order.Audit'],
    alias:'widget.order_panel',
    border:false,
    style: 'padding:5px;',
    items:[
        {
            xtype:'order_general'
        },{
            xtype:'order_audit'
        }
    ]
});