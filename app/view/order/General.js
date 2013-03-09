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
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
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
                }
            ]
        }
    ]
});