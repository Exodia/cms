Ext.define('AM.view.invoice.SearchPanel', {
    extend: 'Ext.form.Panel',
    requires: ['AM.view.CompanyField', 'AM.view.HiddenField'],
    alias: 'widget.invoice_search_panel',
    border: false,
    style: {
        borderRadius: 'none'
    },
    autoScroll: true,
    collapsible: true,
    collapsed: true,
    collapseDirection: 'right',
    title: '查询发票',
    frame: true,
    width: 200,
    dock: 'left',
    defaults: {
        labelAlign: 'top',
        xtype: 'textfield',
        padding: 10,
        width: 170
    },
    items: [
        {
            fieldLabel: '发票编号',
            name: 'invoiceCode'
        },
        {
            fieldLabel: '开票开始时段',
            xtype: 'datefield',
            editable: false,
            name: 'startDate'
        },
        {
            fieldLabel: '开票结束时段',
            xtype: 'datefield',
            editable: false,
            name: 'endDate'
        },
        {
            name: 'salesMan',
            fieldLabel: '开票人'
        },
        {
            name: 'companyName',
            fieldLabel: '购货单位',
            xtype: 'company_field'
        },
        {
            name: 'contractCode',
            fieldLabel: '合同号'
        },
        {
            name: 'customId',
            xtype: 'hidden_field'
        },
        {
            text: '查询',
            xtype: 'button',
            margin: 40,
            width: 100,
            height: 35,
            action: 'search_invoice'
        }
    ]
});