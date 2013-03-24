Ext.define('AM.view.transport.Panel', {
    extend:'Ext.tab.Panel',
    requires: ['AM.view.transport.General'],
    alias:'widget.transport_panel',
    items:[{
        xtype:'transport_general'
    }]
});