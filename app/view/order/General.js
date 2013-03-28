Ext.define('AM.view.order.General', {
    extend: 'Ext.panel.Panel',
    requires: ['AM.view.order.SearchList'],
    alias: 'widget.order_general',
    title: '订单总览',
    border: false,
    frame: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'order_search_list',
            flex: 1
        }
    ],
    getDockTabs: function () {
        var tabs = [
            {
                text: '新增订单',
                iconCls: 'icon-add',
                itemId: 'J_OrderAdd'
            },
            '-',
            {
                text: '查看详情',
                itemId: 'J_OrderView',
                iconCls: 'icon-edit',
                disabled: true
            },
            '-',
            {
                text: '变更订单',
                itemId: 'J_OrderEdit',
                disabled: true
            },
            '-',
            {
                text: '查询订单',
                itemId: 'J_OrderSearch'
            }
        ];

        switch (window.LoginUser.userType) {
            case 0:
            case 1:
                return tabs;
            case 2:
            case 3:
                return [tabs[2], '-', tabs[6]];
        }
    },

    initComponent: function () {
        this.dockedItems = {
            xtype: 'toolbar',
            dock: 'top',
            items: this.getDockTabs()
        };
        this.callParent(arguments);
    }



});