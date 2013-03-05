Ext.define('AM.view.user.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.userpanel',
    title:'用户列表',
    iconCls:'x-icon-users',
    border:false,
    autoScroll: true,
    items:[
        {
            xtype:'userlist'
        }
    ]

});