Ext.define('AM.view.invoice.Audit', {
    extend: 'Ext.panel.Panel',
    requires: ['AM.view.invoice.List'],
    alias: 'widget.invoice_audit',
    title: '未审核合同',
    layout: 'fit',
    flex: 1,
    items: [
        {
            xtype: 'invoice_list',
            store: 'AuditContracts'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: '审核合同',
                    disabled: true,
                    iconCls: 'icon-edit',
                    itemId: 'J_ContractAudit'
                }
            ]
        }
    ]

});