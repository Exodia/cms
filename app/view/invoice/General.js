Ext.define('AM.view.invoice.General', {
    extend: 'Ext.panel.Panel',
    requires: ['AM.view.invoice.SearchList'],
    alias: 'widget.invoice_general',
    title: '发票总览',
    border: false,
    frame: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'invoice_search_list',
            flex: 1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: '新增发票',
                    iconCls: 'icon-add',
                    itemId: 'J_InvoiceAdd'
                },
                '-',
                {
                    text: '查看详情',
                    itemId: 'J_InvoiceView',
                    iconCls: 'icon-edit',
                    disabled: true
                },

                '-',
                {
                    text: '变更发票',
                    itemId: 'J_InvoiceEdit',
                    disabled: true
                },

                '-',

                {
                    text: '查询发票',
                    itemId: 'J_InvoiceSearch'
                }
            ]
        }
    ]
});