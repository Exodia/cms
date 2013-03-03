/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-2-26
 * Time: 上午11:13
 */
Ext.define('AM.view.order.DetailList', {
    extend:'Ext.grid.Panel',
    requires:['AM.view.MaterialCode'],
    alias:'widget.order_detail_list',
   /* store: Ext.create('Ext.data.Store', {
        fields: ['id', 'material_code', 'material_name', 'type','unit',
            'amount', 'unit_price', 'unit_tax_price', 'deadline']
    }),*/

//    store: Ext.create('AM.model.Order').detail(),
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

        this.editorPlugin = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit:1
        });

        this.plugins = [this.editorPlugin];

        this.columns = [
            {
                header:'物质编码',
                dataIndex:'detail.material_code',
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
                dataIndex:'unit_tax_price',
                renderer: this.self.floatRender,
                width: 100
            },
            {
                header:'金额(元)',
                dataIndex:'price',
                renderer: this.self.floatRender,
                flex:0.5
            },
            {
                header:'含税金额(元)',
                dataIndex:'tax_price',
                renderer: this.self.floatRender,
                width: 120
            },
            {
                header:'客户要求交货日期',
                dataIndex:'detail.deadline',
                editor:{
                    xtype:'datefield',
                    allowBlank:false
                },
                width:140,
                renderer:function (v) {
                    if (!v) {
                        return '';
                    }
                    return Ext.Date.format(new Date(v), 'Y年m月d日 H:i');
                }
            }
        ];
        this.callParent(arguments);
    },

    onRender:function () {
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


        this.callParent(arguments);
    },

    listeners:{
        selectionchange:function (sm) {
            var len = sm.getSelection().length;
            this.delOrderBtn.setDisabled(len == 0);

        },


        edit:function (editor, e) {
            var record = e.record,
                field = e.field,
                column = e.column,
                colEditor = column.getEditor(record);

            switch (field) {
                case 'material_code':
                    var rec = colEditor.getModelData();
                    record.set({
                        'material_name':rec[0].get('name'),
                        'type':rec[0].get('type'),
                        'unit':rec[0].get('unit')
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
            record = store.add({}),
            editor = this.editorPlugin;
//        store.add(record);
        editor.startEdit(record, this.columns[0]);

        this._bindEditorEvents(record);
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

    },
    _bindEditorEvents:function (record) {
        var materialCodeCombo = this.columns[0].getEditor(record);

        materialCodeCombo.on('select', function (combo, rec) {
            record.set({
                'material_name':rec[0].get('name'),
                'type':rec[0].get('type'),
                'unit':rec[0].get('unit')
            });

        });
    }
});