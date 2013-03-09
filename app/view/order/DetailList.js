Ext.define('AM.view.order.DetailList', {
    extend:'Ext.grid.Panel',
    requires:['AM.view.MaterialCode'],
    alias:'widget.order_detail_list',
    statics: {
        TAX: 0.17,
        floatRender: function(v) {
            if(!v) {
                return '';
            }
            return v.toFixed(2);
        }
    },

    selType:'cellmodel',

    initComponent: function() {
        this.store = this.order.detail();

        if(this.orderStatus === 'view' || this.orderStatus === 'edit') {
            this.store.load({
                params: {
                    'orderId': this.order.get('id')
                }
            });
        }


        if(this.orderStatus == 'edit' || this.orderStatus == 'add') {
            this.editorPlugin = Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit:1
            });

            this.plugins = [this.editorPlugin];
        }

        this.columns = [
            {
                header:'物质编码',
                dataIndex:'materialCode',
                editor:{
                    allowBlank:false,
                    xtype:'material_code',
                    name: 'materialCode'
                },
                flex:1
            },
            {
                header:'物料名称',
                dataIndex:'materialName',
                flex:1
            },
            {
                header:'规格型号',
                dataIndex:'type',
                width: 60
            },
            {
                header:'计量单位',
                dataIndex:'unit',
                width:60
            },
            {
                header:'数量',
                dataIndex:'amount',
                editor:{
                    xtype:'numberfield',
                    minValue:1,
                    allowDecimals:false,
                    allowBlank:false,
                    name: 'amount'
                },
                flex:0.5
            },
            {
                header:'单价(元)',
                dataIndex:'unitPrice',
                editor:{
                    xtype:'numberfield',
                    minValue:0,
                    allowBlank:false,
                    name: 'unit_price'
                },
                flex:0.5
            },
            {
                header:'含税单价(元)',
                dataIndex: 'unitTaxPrice',
                renderer: this.self.floatRender,
                width: 100
            },
            {
                header:'金额(元)',
                dataIndex:'price',
                renderer: this.self.floatRender,
                width: 110
            },
            {
                header:'含税金额(元)',
                dataIndex:'taxPrice',
                renderer: this.self.floatRender,
                width: 120
            },
            {
                header:'客户要求交货日期',
                dataIndex:'deadline',
                editor:{
                    xtype:'datefield',
                    format: 'Y月m年d日',
                    allowBlank:false
                },
                renderer: function(v) {
                  if(!v) {
                      return v;
                  }

                  return Ext.Date.format(new Date(v), 'Y年m月d日');
                },
                width:140

            }
        ];
        this.callParent(arguments);
    },

    onRender:function () {
        if(this.orderStatus == 'edit' || this.orderStatus === 'add') {
            this.addOrderBtn = new Ext.Button({
                iconCls:'icon-add',
                handler:this.addOrderItem,
                text:'新增',
                scope:this
            });

            this.delOrderBtn = new Ext.Button({
                iconCls:'icon-delete',
                itemId:'',
                handler:this.delOrderItem,
                text:'删除',
                disabled:true,
                scope:this
            });

            this.addDocked({
                xtype:'toolbar',
                items:[this.addOrderBtn, this.delOrderBtn]
            });

            this.on('selectionchange', function (sm) {
                var len = sm.getSelection().length;
                this.delOrderBtn.setDisabled(len == 0);

            });
        }


        this.callParent(arguments);
    },

    listeners:{
        edit:function (editor, e) {
            var record = e.record,
                field = e.field,
                column = e.column,
                colEditor = column.getEditor(record);

            switch (field) {
                case 'materialCode':
                    var rec = colEditor.findRecordByValue(colEditor.getValue());
                    record.set({
                        'material_name':rec.get('name'),
                        'type':rec.get('type'),
                        'unit':rec.get('unit')
                    });

                    break;

                case 'amount':
                case 'unitPrice':
                    var amount = record.get('amount'),
                        unit_price = record.get('unitPrice');

                    if(unit_price && unit_price > 0) {
                        record.set('unitTaxPrice', unit_price * (this.self.TAX + 1));
                        amount && amount > 0 && this.setPrice(record);
                    }

                    break;


            }
        }
    },

    addOrderItem:function () {
        var store = this.getStore(),
            record = store.add({})[0],
            editor = this.editorPlugin;
        editor.startEdit(record, this.columns[0]);

    },
    delOrderItem:function () {
        var store = this.getStore(),
            record = this.getSelectionModel().getSelection()[0];

        store.remove(record);
    },

    setPrice:function (record) {
        var amount = record.get('amount'),
            unit_price = record.get('unitPrice'),
            unit_tax_price = record.get('unitTaxPrice');

        record.set({
            price: amount * unit_price,
            taxPrice: amount * unit_tax_price
        });
    },

    validate:function () {

    }
});