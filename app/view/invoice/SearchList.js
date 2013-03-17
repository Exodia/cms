Ext.define('AM.view.invoice.SearchList', {
    extend: 'AM.view.invoice.List',
    requires: ['AM.view.invoice.SearchPanel'],
    alias: 'widget.invoice_search_list',
    onRender: function() {
        this.addDocked({
            xtype: 'invoice_search_panel'
        });
        this.callParent(arguments);
    }
});