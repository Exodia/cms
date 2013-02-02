/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-1-26
 * Time: 下午5:46
 */
Ext.define('AM.view.user.List', {
    extend:'Ext.grid.Panel',
    alias:'widget.userlist',
    store:'Users',
    flex: 1,
    initComponent:function () {
        this.columns = [
            {header:'工号', dataIndex:'id', flex:1},
            {header:'用户名', dataIndex:'name', flex:1},
            {header:'职位', dataIndex:'user_type', flex:1},
            {header:'住址', dataIndex:'address', flex:1},
            {header:'联系方式', dataIndex:'contact', flex:1},
            {header:'Email', dataIndex:'email', flex:1}
        ];
        this.callParent(arguments);
    }
});