Ext.define('AM.view.user.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.user_panel',
    title:'员工管理',
    iconCls:'x-icon-users',
    border:false,
    style: 'padding: 5px',
    autoScroll: true,
    items:[
        {
            xtype:'user_list'
        }
    ]

});