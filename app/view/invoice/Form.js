Ext.define('AM.view.invoice.Form', {
    extend: 'Ext.form.Panel',
    requires: ['AM.view.CompanyField', 'AM.view.HiddenField'],
    alias: 'widget.invoice_form',
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
            allowBlank: false,
            readOnly: this.invoiceStatus === 'view'
        };


        this.items = [
            {
                fieldLabel: '发票编号',
                name: 'invoiceCode'
            },
            {
                fieldLabel: '开票日期',
                xtype: 'datefield',
                editable: false,
                format: 'Y年m月d月',
                submitFormat: 'Y-m-d',
                name: 'invoiceDate'
            },
            {
                name: 'companyName',
                xtype: this.invoiceStatus !== 'view' ? 'company_field' : 'textfield',
                allowBlank: this.invoiceStatus === 'edit',
                fieldLabel: '购货单位'
            },
            {
                name: 'contractCode',
                fieldLabel: '对应合同号'
            }

        ];

        this.invoiceStatus !== 'view' && this.items.push({
            xtype: 'button',
            scale: 'small',
            action: 'add_contract',
            text: '添加合同'
        });


        this.items.push({
                name: 'invoiceMoney',
                xtype: 'numberfield',
                fieldLabel: '发票金额',
                minValue: 0
            },
            {
                fieldLabel: '开票人',
                disabled: true,
                name: 'salesManName'
            },
            {
                fieldLabel: '备注',
                allowBlank: true,
                xtype: 'textareafield',
                name: 'info'
            },
            {
                name: 'salesManId',
                allowBlank: true,
                xtype: 'hidden_field'
            },
            {
                name: 'customId',
                allowBlank: true,
                xtype: 'hidden_field'
            });


        this.callParent(arguments);
    }
});