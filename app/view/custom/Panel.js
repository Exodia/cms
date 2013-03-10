Ext.define('AM.view.custom.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.custom_panel',
    title: '客户信息管理',
    style: 'padding:5px;',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'custom_list'
        }
    ]
});