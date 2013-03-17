Ext.define('AM.view.invoice.Form', {
    extend: 'Ext.form.Panel',
    requires: ['AM.view.CompanyField', 'AM.view.HiddenField'],
    alias: 'widget.invoice_form',
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
                name: 'invoiceDate'
            },
            {
                name: 'companyName',
                xtype: this.invoiceStatus === 'add' ? 'company_field' : 'textfield',
                fieldLabel: '购货单位',
                forceSelection: true,
                allowBlank: false
            },
            {
                name: 'contractCode',
                fieldLabel: '对应合同号'
            },
            {
                name:'invoiceMoney',
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
                name: 'salesManId',
                xtype: 'hidden_field'
            },
            {
                name: 'customId',
                xtype: 'hidden_field'
            }
        ];




        this.callParent(arguments);
    }
});