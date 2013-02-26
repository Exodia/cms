/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-2-26
 * Time: 上午11:11
 */
Ext.define('AM.view.order.Detail', {
    extend:'Ext.panel.Panel',
    alias: 'widget.orderdetail',
    requires:['AM.view.order.DetailList'],
    title:'订单详情',
    closable: true,
    items: [{
        xtype:'order_detail_list'
    }]
});