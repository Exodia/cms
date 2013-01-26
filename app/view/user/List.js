/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-1-26
 * Time: 下午5:46
 */
Ext.define('AM.view.user.List', {
    extend:'Ext.grid.Panel',
    alias:'widget.userlist',

    frame:true,
    store:'Users',
    initComponent:function () {
        this.columns = [
            {header:'Name', dataIndex:'name', flex:1},
            {header:'Email', dataIndex:'email', flex:1}
        ];

        this.callParent(arguments);
    }
});