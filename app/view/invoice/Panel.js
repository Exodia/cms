Ext.define('AM.view.invoice.Panel', {
    extend:'Ext.tab.Panel',
    alias:'widget.invoice_panel',
    requires: ['AM.view.invoice.General', 'AM.view.invoice.Audit'],

    items:[{
        xtype: 'invoice_general'
    }/*, {
        xtype: 'invoice_audit'
    }*/]
});