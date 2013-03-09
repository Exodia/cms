Ext.define('AM.view.order.Audit', {
    extend: 'Ext.panel.Panel',
//    extend: 'AM.view.order.List',
    requires: ['AM.view.order.List'],
    alias: 'widget.order_audit',
    title: '未审核订单',
    layout: 'fit',
    flex: 1,
    items: [{
        xtype: 'order_list',
        store: 'AuditOrders'
    }]

});