Ext.define('AM.view.order.ViewDetailList', {
    extend: 'AM.view.order.DetailList',
    alias: 'widget.order_view_list',
    selType: 'rowmodel',

    initComponent: function () {
        this.callParent(arguments);
        this.store = this.order[this.storeName]();
        this.store.load({
            params: this.params
        });
    }
});