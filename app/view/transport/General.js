Ext.define('AM.view.transport.General', {
    extend: 'Ext.panel.Panel',
    requires: ['AM.view.transport.List'],
    alias: 'widget.transport_general',
    title: '发运总览',
    border: false,
    frame: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'transport_list',
            flex: 1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    iconCls: 'icon-add',
                    itemId: 'J_TransportAdd',
                    text: '新增发运',
                    scope: this
                },
                {
                    iconCls: 'icon-edit',
                    itemId: 'J_TransportConfirm',
                    text: '发运确认',
                    scope: this,
                    disabled: true
                }
            ]
        }
    ]
});