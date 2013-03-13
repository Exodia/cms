Ext.define('AM.view.contract.SearchList', {
    extend: 'AM.view.contract.List',
    requires: ['AM.view.contract.SearchPanel'],
    alias: 'widget.contract_search_list',
    onRender: function() {
        this.addDocked({
            xtype: 'search_panel'
        })
        this.callParent(arguments);
    }
});