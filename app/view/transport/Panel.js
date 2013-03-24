Ext.define('AM.view.transport.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.transport_panel',
    title:'发运管理',
    items:[{
        xtype:'transport_list'
    }]
});