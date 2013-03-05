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

        if(this.orderStatus == 'edit') {
            this.editorPlugin = Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit:1
            });

            this.plugins = [this.editorPlugin];
        }

        this.columns = [
            {
                header:'物质编码',
                dataIndex:'material_code',
                editor:{
                    allowBlank:false,
                    xtype:'materialcode',
                    name: 'material_code'
                },
                flex:1
            },
            {
                header:'物料名称',
                dataIndex:'material_name',
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
                dataIndex:'unit_price',
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
                dataIndex: 'unit_tax_price',
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
                dataIndex:'tax_price',
                renderer: this.self.floatRender,
                width: 120
            },
            {
                header:'客户要求交货日期',
                dataIndex:'deadline',
                editor:{
                    xtype:'datefield',
                    format: 'Y年m月d日',
                    allowBlank:false
                },
                width:140

            }
        ];
        this.callParent(arguments);
    },

    onRender:function () {
        if(this.orderStatus == 'edit') {
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
                case 'material_code':
                    var rec = colEditor.findRecordByValue(colEditor.getValue());
                    record.set({
                        'material_name':rec.get('name'),
                        'type':rec.get('type'),
                        'unit':rec.get('unit')
                    });

                    break;

                case 'amount':
                case 'unit_price':
                    var amount = record.get('amount'),
                        unit_price = record.get('unit_price');

                    if(unit_price && unit_price > 0) {
                        record.set('unit_tax_price', unit_price * (this.self.TAX + 1));
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

    },

    setPrice:function (record) {
        var amount = record.get('amount'),
            unit_price = record.get('unit_price'),
            unit_tax_price = record.get('unit_tax_price');

        record.set({
            price: amount * unit_price,
            tax_price: amount * unit_tax_price
        });
    },

    validate:function () {

    }
});