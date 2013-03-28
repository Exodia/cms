Ext.define('AM.view.contract.Panel', {
    extend:'Ext.tab.Panel',
    requires: ['AM.view.contract.General', 'AM.view.contract.Audit'],
    alias:'widget.contract_panel',
    style: 'padding:5px;',
    getTabs: function () {
        var tabs = [{
            xtype: 'contract_general'
        }, {
            xtype: 'contract_audit'
        }];

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
