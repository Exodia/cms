Ext.define('AM.view.contract.Detail', {
    extend:'Ext.panel.Panel',
    alias: 'widget.contract_detail',
    requires:['AM.view.contract.DetailList', 'AM.view.contract.Form'],
    title:'合同详情',
    closable: true,
    layout: 'border',
    initComponent: function() {
        this.items = [{
            xtype: 'contract_form',
            contract: this.contract,
            contractStatus: this.contractStatus,
            resizable: true,
            region: 'west'
        },{
            xtype:'contract_detail_list',
            contractStatus: this.contractStatus,
            contract: this.contract,
            region: 'center'
        }];

        if(this.contractStatus == 'add') {
            this.items.push({
                region: 'south',
                buttons:[{
                    text: '保存',
                    action: 'add_save'
                }]
            });
        }

        this.callParent(arguments);
    }
});