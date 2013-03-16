Ext.define('AM.view.contract.Audit', {
    extend: 'Ext.panel.Panel',
    requires: ['AM.view.contract.List'],
    alias: 'widget.contract_audit',
    title: '未审核合同',
    layout: 'fit',
    flex: 1,
    items: [
        {
            xtype: 'contract_list',
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