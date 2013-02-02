/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-1-27
 * Time: 上午12:22
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.user.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.userpanel',
    title:'用户列表',
    iconCls:'x-icon-users',
    border:false,
    items:[
        {
            xtype:'userlist'
        }
    ]

});