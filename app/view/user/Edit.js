Ext.define('AM.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.user_edit',
    modal: true,
    title: '编辑用户',
    layout: 'fit',
    autoShow: true,

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                width: 400,
                padding: "10 10 10 35",
                frame: true,

                layout: {
                    type: 'table',
                    columns: 2
                },
                defaults: {
                    allowBlank: false,
                    readOnly: this.status === 'view',
                    xtype: 'textfield'
                },
                items: [
                    {
                        colspan: 2,
                        name: 'workNum',
                        fieldLabel: '工号',
                        labelWidth: 60,
                        minValue: 0,
                        width: 260,
                        padding: 5
                    },
                    {
                        name: 'name',
                        fieldLabel: '姓名',
                        labelWidth: 60,
                        width: 150,
                        padding: 5,
                        margin: '0 20 0 0'
                    },
                    {
                        xtype: 'user_type',
                        name: 'userType'
                    },
                    {
                        colspan: 2,
                        name: 'address',
                        fieldLabel: '住址',
                        labelWidth: 60,
                        allowBlank: true,
                        width: 260,
                        padding: 5
                    },
                    {
                        name: 'contact',
                        colspan: 2,
                        fieldLabel: '联系方式',
                        labelWidth: 60,
                        width: 260,
                        padding: 5
                    },
                    {
                        colspan: 2,
                        name: 'email',
                        fieldLabel: 'Email',
                        labelWidth: 60,
                        width: 260,
                        vtype: 'email',
                        vtypeText: '请输入合法的Email地址',
                        allowBlank: true,
                        padding: 5
                    },
                    {
                        xtype: 'sale_group',
                        name: 'saleGroup'
                    }
                ]
            }
        ];

        if (this.status !== 'view') {
            this.buttons = [
                {
                    text: '保存',
                    action: 'save'
                },
                {
                    text: '取消',
                    scope: this,
                    handler: this.close
                }
            ];
        }


        this.callParent(arguments);
    }
});