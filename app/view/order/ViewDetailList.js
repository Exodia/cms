Ext.define('AM.view.order.ViewDetailList', {
    extend: 'AM.view.order.DetailList',
    alias: 'widget.order_view_list',
    selType: 'rowmodel',

    initStore: function() {
        this.store = this.order[this.storeName]();
    },
    initComponent: function () {
        this.callParent(arguments);

        
        this.store.load({
            scope: this,
            params: this.params,
            callback: function (records, op, success) {
                if(success) {
                    this.store.getTotalCount() == 0 && this.store.add(records);
                } else {
                    AM.error();
                }
            }
            
        });

    }
});