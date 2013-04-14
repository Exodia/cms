Ext.define('AM.view.datamgr.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.data_edit',
    modal: true,
    title: '编辑物料',
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
                        name: 'code',
                        fieldLabel: '物质编码',
                        labelWidth: 60,
                        width: 260,
                        padding: 5
                    },
                    {
                        colspan: 2,
                        name: 'name',
                        fieldLabel: '物料名称',
                        labelWidth: 60,
                        width: 150,
                        padding: 5,
                        margin: '0 20 0 0'
                    },
                    {
                        name: 'type',
                        colspan: 2,
                        fieldLabel: '规格型号',
                        labelWidth: 60,
                        allowBlank: true,
                        width: 260,
                        padding: 5
                    },
                    {
                        name: 'unit',
                        fieldLabel: '计量单位',
                        labelWidth: 60,
                        allowBlank: true,
                        width: 260,
                        padding: 5
                    },
                    {
                        name: 'costPrice',
                        fieldLabel: '成本价格',
                        labelWidth: 60,
                        allowBlank: true,
                        xtype: 'number',
                        width: 120,
                        padding: 5
                    },
                    {
                        name: 'sellPrice',
                        fieldLabel: '销售价格',
                        labelWidth: 60,
                        allowBlank: true,
                        width: 120,
                        padding: 5
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