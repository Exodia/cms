/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-1-26
 * Time: 下午5:46
 */
Ext.define('AM.view.order.List', {
    extend:'Ext.grid.Panel',
    alias:'widget.orderlist',
    store:'Orders',
    flex: 1,
    initComponent:function () {
        this.columns = [
            {header:'Name', dataIndex:'id', flex:1},
            {header:'Email', dataIndex:'custom', flex:1}
        ];

        this.callParent(arguments);
    }
});