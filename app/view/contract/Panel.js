Ext.define('AM.view.contract.Panel', {
    extend:'Ext.tab.Panel',
    requires: ['AM.view.contract.General'],
    alias:'widget.contract_panel',
    style: 'padding:5px;',
    items:[{
        xtype: 'contract_general'
    }]
});
