Ext.define('AM.view.transport.Edit', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.transport_edit',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    closable: true,
    columns: [
        {
            header: '物质编码',
            dataIndex: 'materialCode',
            flex: 1
        },
        {
            header: '物料名称',
            dataIndex: 'materialName',
            flex: 1
        },
        {
            header: '规格型号',
            dataIndex: 'type',
            width: 60
        },
        {
            header: '计量单位',
            dataIndex: 'unit',
            width: 60
        },
        {
            header: '订单数量',
            dataIndex: 'orderAmount',
            width: 70
        },
        {
            header: '单价(元)',
            dataIndex: 'unitPrice',
            renderer: AM.floatRender,
            width: 60
        },
        {
            header: '含税单价(元)',
            dataIndex: 'unitTaxPrice',
            renderer: AM.floatRender,
            width: 90
        },
        {
            header: '金额(元)',
            dataIndex: 'price',
            renderer: AM.floatRender,
            width: 80
        },
        {
            header: '含税金额(元)',
            dataIndex: 'taxPrice',
            renderer: AM.floatRender,
            width: 90
        },
        {
            header: '客户要求交货日期',
            dataIndex: 'deadline',
            editor: {
                xtype: 'datefield',
                format: 'Y月m年d日',
                editable: false,
                allowBlank: false
            },
            renderer: function (v) {
                if (!v) {
                    return v;
                }

                return Ext.Date.format(new Date(v), 'Y年m月d日');
            },
            width: 110

        },
        {
            header: '发货数量',
            width: 70,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0
            },
            dataIndex: 'transportAmount'
        },
        {
            header: '包装箱种类',
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0
            },
            width: 80,

            dataIndex: 'boxType'
        },
        {
            header: '包装箱数量',
            width: 70,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0
            },
            dataIndex: 'boxAmount'
        }
    ],
    buttons: [
        {
            text: '保存',
            action: 'save_transport'
        }
    ],
    searchOrder: function (btn) {
        var text = Ext.String.trim(btn.prev().getValue());
        if (text) {
            Ext.Ajax.request({
                method: 'GET',
                url: AM.API['orderDetail'].read,
                params: {
                    orderCode: text
                },
                success: function (res) {
                    try {
                        var obj = Ext.decode(res.responseText),
                            success = obj.success;
                        if (!success) {
                            AM.error('错误', obj.msg);
                        } else {
                            var data = obj.data;
                            for (var i = data.length - 1; i > -1; --i) {
                               data[i].orderAmount = data[i].amount;
                            }
                            this.transport.set('orderCode', text);
                            this.store.removeAll();
                            this.store.add(data);
                        }
                    } catch (e) {
                        AM.error('错误');
                    }

                },
                failure: function () {
                    AM.error('错误');
                },
                scope: this

            });
        }
    },

    initComponent: function () {
        this.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        xtype: 'textfield',
                        emptyText: '请输入订单号'
                    },
                    Ext.create('Ext.Button', {
                        text: '添加',
                        handler: this.searchOrder,
                        scope: this,
                        cls: 'x-btn-default-small'
                    })
                ]
            }

        ];
        this.store = this.transport.detail();
        this.callParent(arguments);
    }
});