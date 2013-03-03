Ext.define('AM.view.order.Panel', {
    extend:'Ext.tab.Panel',
    requires:['AM.view.order.General', 'AM.view.order.Audit'],
    alias:'widget.orderpanel',
    border:false,
    items:[
        {
            xtype:'ordergeneral'
        },{
            xtype:'orderaudit'
        }
    ]
});