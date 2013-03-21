Ext.define('AM.view.invoice.DetailList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoice_detail_list',
    features: [{
        ftype: 'summary',
        id: 'summary'
    }],

    selType: 'cellmodel',

    initComponent: function () {
        this.store = this.invoice.detail();
        if (this.invoiceStatus !== 'add') {
            this.store.load({
                params: {
                    'invoiceId': this.invoice.get('id')
                }
            });
        }

        if (this.invoiceStatus !== 'view'){
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
                flex: 0.5
            },
            {
                header: '剩余数量',
                dataIndex: 'remainAmount',
                flex: 0.5
            },
            {
                header: '已选数量',
                dataIndex: 'invoiceAmount',
                editor: {
                    xtype: 'numberfield',
                    minValue: 1,
                    allowBlank: false,
                    name: 'invoiceAmount'
                },
                flex: 0.6,
                summaryType: function (records) {
                    var i = 0,
                        length = records.length,
                        total = 0,
                        record;

                    for (; i < length; ++i) {
                        record = records[i];
                        total += (record.get('invoiceAmount') || 0) * record.get('unitPrice');
                    }
                    return total;
                } ,
                summaryRenderer: function(value) {
                    return "总价: " + value.toFixed(2) + "元";
                }
            }

        ];

        this.callParent(arguments);
    },



    setPrice: function () {


    }
});