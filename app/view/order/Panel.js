/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-1-28
 * Time: 下午7:02
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-1-27
 * Time: 上午12:22
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.order.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.orderpanel',
    title:'订单管理',
    border:false,
    items:[
        {
            xtype:'orderlist'
        }
    ]
});