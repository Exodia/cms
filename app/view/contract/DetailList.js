Ext.define('AM.view.contract.DetailList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contract_detail_list',
    statics: {
        TAX: 0.17,
        floatRender: function (v) {
            if (typeof v == 'number') {
                return v.toFixed(2);
            }
            return '';

        }
    },
    features: [
        {ftype: 'grouping'}
    ],

    selType: 'cellmodel',

    initComponent: function () {
        this.store = this.contract.detail();
        if (this.contractStatus === 'view') {
            this.store.load({
                params: {
                    'contractId': this.contract.get('id')
                }
            });
        } else {

            this.editorPlugin = Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            });

            this.plugins = [this.editorPlugin];
        }

        this.store.group('orderCode');
        this.columns = [
            {
                header: "订单编号",
                dataIndex: 'orderCode',
                editor: {
                    allowBlank: false,
                    xtype: 'textfield',
                    name: 'orderCode'
                }
            },
            {
                header: '物质编码',
                dataIndex: 'materialCode',
                editor: {
                    allowBlank: false,
                    xtype: 'material_code',
                    name: 'materialCode'
                },
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
                header: '数量',
                dataIndex: 'amount',
                editor: {
                    xtype: 'numberfield',
                    minValue: 1,
                    allowDecimals: false,
                    allowBlank: false,
                    name: 'amount'
                },
                flex: 0.5
            }
        ];

        this.contractStatus === 'add' && this.columns.push({
            header: '剩余数量',
            dataIndex: 'remianAmount',
            editor: {
                xtype: 'numberfield',
                minValue: 1,
                allowDecimals: false,
                allowBlank: false,
                name: 'remainAmount'
            },
            width: 60
        });

        this.columns.push(
            {
                header: '单价(元)',
                dataIndex: 'unitPrice',
                renderer: this.self.floatRender,
                editor: {
                    xtype: 'numberfield',
                    minValue: 0,
                    allowBlank: false,
                    name: 'unitPrice'
                },
                flex: 0.5
            },
            {
                header: '含税单价(元)',
                dataIndex: 'unitTaxPrice',
                renderer: this.self.floatRender,
                width: 100
            })
        this.callParent(arguments);
    },

    onRender: function () {
        if (this.contractStatus === 'add') {

            this.addOrderBtn = new Ext.Button({
                scale: 'small',
                handler: this.addContractItem,
                text: '添加订单',
                cls: 'x-btn-default-small',
                scope: this
            });

            this.delOrderBtn = new Ext.Button({
                iconCls: 'icon-delete',
                itemId: '',
                handler: this.delContractItem,
                text: '删除',
                disabled: true,
                scope: this
            });

            this.addDocked({
                xtype: 'toolbar',
                items: [
                    {
                        emptyText: '输入订单编号',
                        padding: '0 5 0 15',
                        itemId: 'J_OrderInput',
                        xtype: 'textfield'
                    },
                    this.addOrderBtn,
                    '-',
                    this.delOrderBtn
                ]
            });

            this.orderInput = this.queryById('J_OrderInput');

            this.on('selectionchange', function (sm) {
                var len = sm.getSelection().length;
                this.delOrderBtn.setDisabled(len == 0);

            });
        }


        this.callParent(arguments);
    },

    listeners: {
        edit: function (editor, e) {
            var record = e.record,
                field = e.field,
                column = e.column,
                colEditor = column.getEditor(record);

            switch (field) {
                case 'materialCode':
                    var rec = colEditor.findRecordByValue(colEditor.getValue());
                    record.set({
                        'materialName': rec.get('name'),
                        'type': rec.get('type'),
                        'unit': rec.get('unit')
                    });

                    break;

                case 'amount':
                case 'unitPrice':
                    var amount = record.get('amount'),
                        unit_price = record.get('unitPrice');

                    if (typeof unit_price === 'number') {
                        record.set('unitTaxPrice', unit_price * (this.self.TAX + 1));
                        amount && amount > 0 && this.setPrice(record);
                    }

                    break;


            }
        }
    },

    addContractItem: function () {
        var store = this.getStore(),
            orderCode = this.orderInput.getValue();
//            editor = this.editorPlugin;

        if(store.findExact('orderCode', orderCode) !== -1) {
            return;
        }

        Ext.Ajax.request({
            url: AM.API['orderDetail'].read,
            method: 'GET',
            params: {
                orderCode: orderCode
            },
            success: function (res) {
                var obj = Ext.decode(res.responseText),
                    success = obj.success;

                if (!success) {
                    AM.error('错误', obj.msg);
                } else {
                    this.store.add(obj.data);
                }

            },
            failure: function () {
                AM.error('错误');
            },

            scope: this
        });


    },
    delContractItem: function () {
        var store = this.getStore(),
            record = this.getSelectionModel().getSelection()[0];

        store.remove(record);
    },

    setPrice: function (record) {
        var amount = record.get('amount'),
            unit_price = record.get('unitPrice'),
            unit_tax_price = record.get('unitTaxPrice');

        record.set({
            price: amount * unit_price,
            taxPrice: amount * unit_tax_price
        });
    },

    validate: function () {

    }
});