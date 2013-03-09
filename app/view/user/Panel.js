Ext.define('AM.view.user.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.user_panel',
    title:'用户列表',
    iconCls:'x-icon-users',
    border:false,
    autoScroll: true,
    items:[
        {
            xtype:'user_list'
        }
    ]

});