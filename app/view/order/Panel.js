Ext.define('AM.view.order.Panel', {
    extend: 'Ext.tab.Panel',
    requires: ['AM.view.order.General', 'AM.view.order.Audit'],
    alias: 'widget.order_panel',
    border: false,
    style: 'padding:5px;',
    getTabs: function () {
       var tabs =  [
           {
               xtype: 'order_general'
           },
           {
               xtype: 'order_audit'
           }
       ];

       if(window.LoginUser.userType !== 0) {
           return [tabs[0]];
       }

       return tabs;

    },

    initComponent: function () {
        this.items = this.getTabs();

        this.callParent(arguments);
    }


});