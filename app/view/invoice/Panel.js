Ext.define('AM.view.invoice.Panel', {
    extend:'Ext.tab.Panel',
    alias:'widget.invoice_panel',
    requires: ['AM.view.invoice.General'],

    items:[{
        xtype: 'invoice_general'
    }]
});