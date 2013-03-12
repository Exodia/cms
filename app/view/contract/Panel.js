Ext.define('AM.view.contract.Panel', {
    extend:'Ext.tab.Panel',
    requires: ['AM.view.contract.List'],
    alias:'widget.contract_panel',
    items:[{
        xtype: 'contract_list',
        title: '合同总览'
    }]
});