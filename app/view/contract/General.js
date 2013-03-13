Ext.define('AM.view.contract.General', {
    extend: 'Ext.panel.Panel',
    requires: ['AM.view.contract.SearchList'],
    alias: 'widget.contract_general',
    title: '合同总览',
    border: false,
    frame: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'contract_search_list',
            flex: 1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: '新增合同',
                    iconCls: 'icon-add',
                    itemId: 'J_ContractAdd'
                },
                '-',
                {
                    text: '查看详情',
                    itemId: 'J_ContractView',
                    iconCls: 'icon-edit',
                    disabled: true
                },
                '-',
                {
                    text: '变更合同',
                    itemId: 'J_ContractEdit',
                    disabled: true
                },
                '-',
                {
                    text: '查询合同',
                    itemId: 'J_ContractSearch'
                }
            ]
        }
    ]
});