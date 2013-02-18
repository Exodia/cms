Ext.define('AM.view.transport.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.transportpanel',
    title:'发运管理',
    items:[{
        xtype:'transportlist'
    }]
});