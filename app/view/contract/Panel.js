Ext.define('AM.view.contract.Panel', {
    extend:'Ext.tab.Panel',
    requires: ['AM.view.contract.General', 'AM.view.contract.Audit'],
    alias:'widget.contract_panel',
    style: 'padding:5px;',
    items:[{
        xtype: 'contract_general'
    }, {
        xtype: 'contract_audit'
    }]
});
