Ext.define('AM.view.order.Panel', {
    extend:'Ext.tab.Panel',
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