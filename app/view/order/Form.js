Ext.define('AM.view.order.Form', {
    extend: 'Ext.form.Panel',
    requires: ['AM.view.SaleGroup', 'AM.view.CustomField', 'AM.view.SalesMan', 'AM.view.HiddenField'],
    alias: 'widget.order_form',
    layout: 'border',
    collapsible: true,
    frame: true,
    region: 'west',
    layout: 'vbox',
    padding: 15,
    autoScroll: true,
    defaultType: 'textfield',

    width: 200,
    initComponent: function () {
        this.defaults = {
            labelAlign: 'top',
            margin: '15 0',
            width: 150,
            readOnly: this.orderStatus !== 'add',
            disabled: this.orderStatus === 'edit'
        };


        this.items = [
            {
                fieldLabel: '项目号',
                name: 'project',
                allowBlank: false
            },
            {
                fieldLabel: '订单日期',
                name: 'date',
                editable: false,
                format: 'Y年m月d日',
                submitFormat: 'Y-m-d',
                xtype: 'datefield'
            },
            {
                xtype: this.orderStatus === 'add'? 'custom_field' : 'textfield',
                name: 'customCompany',
                fieldLabel:'订货客户'
            },
            {
                fieldLabel: '销售组',
                disabled:  this.orderStatus !== 'view',
                width: 150,
                padding: 0,
                readOnly: true,
                name: 'saleGroup',
                xtype: 'sale_group'
            },
            {
                fieldLabel: '销售员',
                disabled: this.orderStatus !== 'view',
                name: 'salesManName',
                xtype: 'textfield'
            },

            {
                name: 'salesManId',
                xtype: 'hidden_field'
            },
            {
                name: 'customId',
                xtype: 'hidden_field'
            },
            {
                name: 'saleManContact',
                xtype: 'hidden_field'
            }
        ];

        this.orderStatus !== 'add' && this.items.unshift({
            fieldLabel: '订单编号',
            name: 'id'
        });

        this.callParent(arguments);
    }
});