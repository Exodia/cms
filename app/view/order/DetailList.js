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
    store: Ext.create('Ext.data.Store', {
        model: 'AM.model.OrderDetail'
    }),
    selType: 'cellmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            pluginId: 'edit_plugin'
        })
    ],
    columns:[
        {
            header:'物质编码',
            dataIndex:'detail.material_code',
            editor: 'materialcode',
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
            flex:1
        },
        {
            header:'计量单位',
            dataIndex:'unit',
            editor: 'textfield',
            width:60
        },
        {
            header:'数量',
            dataIndex:'amount',
            flex:0.5
        },
        {
            header:'单价(元)',
            dataIndex:'unit_price',
            flex:0.5
        },
        {
            header:'含税单价(元)',
            dataIndex:'unit_tax_price',
            flex:0.5
        },
        {
            header:'金额(元)',
            dataIndex:'price',
            flex:0.5
        },
        {
            header:'含税金额(元)',
            dataIndex:'tax_price',
            flex:0.5
        },
        {
            header:'客户要求交货日期',
            dataIndex:'detail.deadline',
            flex:1,
            renderer:function (v) {
                return Ext.Date.format(new Date(v), 'Y年m月d日 H:i');
            }
        }
    ],
    onRender: function() {
        this.addOrderBtn = new Ext.Button({
            iconCls:'icon-add',
            handler: this.addOrderItem,
            text:'新增',
            scope:this
        });

        this.delOrderBtn = new Ext.Button({
            iconCls: 'icon-delete',
            itemId: '',
            handler: this.delOrderItem,
            text:'删除',
            disabled: true,
            scope:this
        });

        this.addDocked({
            xtype: 'toolbar',
            items: [this.addOrderBtn,  this.delOrderBtn]
        });

        this.callParent(arguments);
    },

    listeners: {
      selectionchange: function(sm) {
          var len = sm.getSelection().length;
          this.delOrderBtn.setDisabled(len == 0);
      }
    },

   addOrderItem: function() {
        var store = this.getStore(),
            record = Ext.create('AM.model.OrderDetail', {id: null}),
            editor = this.getPlugin('edit_plugin');
        store.add(record);
       editor.startEdit(record, this.columns[0]);
   },
   delOrderItem: function() {

   }
});