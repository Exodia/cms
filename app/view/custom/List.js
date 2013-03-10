Ext.define('AM.view.custom.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.custom_list',
    store: 'Customs',
    flex: 1,
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    iconCls: 'icon-add',
                    itemId: 'J_CustomAdd',
                    text: '新增客户',
                    scope: this
                },
                '-',
                {
                    iconCls: 'icon-edit',
                    itemId: 'J_CustomEdit',
                    text: '编辑',
                    disabled: true,
                    scope: this
                },
                '-',
                {
                    iconCls: 'icon-delete',
                    itemId: 'J_CustomDelete',
                    text: '删除',
                    scope: this,
                    disabled: true
                },
                '->',
                {
                    xtype: 'textfield',
                    itemId: 'J_CustomSearchText',
                    width: 200,
                    emptyText: '输入企业名称查询'
                },
                Ext.create('Ext.Button', {
                    itemId: 'J_CustomSearch',
                    text: '查询',
                    cls: 'x-btn-default-small'
                })
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: 'Customs',
            dock: 'bottom',
            displayInfo: true
        }
    ],
    initComponent: function () {
        this.columns = [
            {xtype: 'rownumberer', header: '序号', flex: 0.5, align: 'center'},
            {header: '企业名称', dataIndex: 'companyName', flex: 1.5},
            {header: '姓名', dataIndex: 'name', flex: 0.5},
            {header: '职务', dataIndex: 'position', flex: 0.5},
            {header: '办公电话', dataIndex: 'officeNumber', flex: 1},
            {header: '手机号码', dataIndex: 'mobileNumber', flex: 1},
            {header: '备注', dataIndex: 'comment', flex: 2}
        ];
        this.callParent(arguments);
    }
});