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
    selModel: {
      mode:'simple'
    },
    selType:'checkboxmodel',
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            iconCls: 'icon-add',
            itemId: 'J_UserAdd',
            text: '新增用户',
            scope: this,
            handler: this.onAdd
        }, '-',{
            iconCls: 'icon-edit',
            itemId: 'J_UserEdit',
            text: '编辑',
            disabled: true,
            scope: this,
            handler: this.onEdit
        },'-', {
            iconCls: 'icon-delete',
            itemId: 'J_UserDelete',
            text: '删除',
            scope: this,
            disabled:true,
            handler: this.onDelete
        }]
    }],
    onAdd: function() {

    },
    onEdit: function() {

    },
    onDelete: function() {

    },
    initComponent:function () {
        this.columns = [
            {header:'工号', dataIndex:'id', flex:1},
            {header:'姓名', dataIndex:'name', flex:0.5},
            {header:'职位', dataIndex:'user_type', flex:0.5},
            {header:'住址', dataIndex:'address', flex:2},
            {header:'联系方式', dataIndex:'contact', flex:1},
            {header:'Email', dataIndex:'email', flex:1}
        ];
        this.callParent(arguments);
    }
});