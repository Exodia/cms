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

    getDockTabs: function () {
        var tabs = [
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
                text: '归档',
                itemId: 'J_ContractFile',
                disabled: true
            },

            '-',

            {
                text: '查询合同',
                itemId: 'J_ContractSearch'
            }
        ];

        return tabs;

    },

    initComponent: function () {
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: this.getDockTabs()

            }
        ];
        this.callParent(arguments);
    }
});