Ext.define('AM.view.invoice.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoice_list',
    store: 'Invoices',
    flex: 1,
    columns: [
        {header: '发票编号', dataIndex: 'invoiceCode', flex: 1},
        {header: '开票日期', dataIndex: 'invoiceDate', width: 100, renderer: AM.dateRender},
        {header: '开票人', dataIndex: 'salesManName', width:50},
        {header: '购货单位', dataIndex: 'companyName', flex: 1},
        {header: '对应合同号', dataIndex: 'contractCode', flex: 1},
        {header: '发票金额', dataIndex: 'invoiceMoney', flex: 1}
    ],
    initComponent: function () {
        this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: this.store,
                dock: 'bottom',
                displayInfo: true
            }
        ];
        this.callParent(arguments);
    }

});