Ext.define('AM.view.invoice.DetailList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoice_detail_list',

    selType: 'cellmodel',

    initComponent: function () {
        this.store = this.invoice.detail();
        if (this.invoiceStatus === 'view') {
            this.store.load({
                params: {
                    'invoiceId': this.invoice.get('id')
                }
            });
        } else {

            this.editorPlugin = Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            });

            this.plugins = [this.editorPlugin];
        }

        this.columns = [
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
                header: '单位',
                dataIndex: 'unit',
                width: 40
            },
            {
                header: '单价(元)',
                dataIndex: 'unitPrice',
                renderer: AM.floatRender,
                editor: {
                    xtype: 'numberfield',
                    minValue: 0,
                    allowBlank: false,
                    name: 'unitPrice'
                },
                flex: 0.5
            },
            {
                header: '剩余数量',
                dataIndex: 'remainAmount',
                flex: 0.5
            },
            {
                header: '发票数量',
                dataIndex: 'invoiceAmount',
                editor: {
                    xtype: 'numberfield',
                    minValue: 1,
                    allowBlank: false,
                    name: 'invoiceAmount'
                },
                flex: 0.5
            }

        ];

        this.callParent(arguments);
    },

    addInvoiceItem: function () {
        var store = this.getStore(),
            orderCode = this.orderInput.getValue();

        if (store.findExact('orderCode', orderCode) !== -1) {
            return;
        }

        Ext.Ajax.request({
            url: AM.API['inoviceDetail'].read,
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
    delInvoiceItem: function () {
        var store = this.getStore(),
            record = this.getSelectionModel().getSelection()[0];

        store.remove(record);
    },

    setPrice: function () {


    }
});