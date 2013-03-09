Ext.define('AM.view.order.SearchList', {
    extend: 'AM.view.order.List',
    requires: ['AM.view.order.SearchPanel'],
    alias: 'widget.order_search_list',
    onRender: function() {
        this.addDocked({
            xtype: 'search_panel'
        })
        this.callParent(arguments);
    }
});