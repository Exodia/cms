Ext.define('AM.view.order.ViewDetailList', {
    extend: 'AM.view.order.DetailList',
    alias: 'widget.order_view_list',
    selType: 'rowmodel',

    initStore: function() {
        this.store = this.order[this.storeName]();
    },
    initComponent: function () {
        this.callParent(arguments);
        tt = this.store;
        this.store.load({
            params: this.params
        });

    }
});