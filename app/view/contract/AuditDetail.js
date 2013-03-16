Ext.define('AM.view.contract.AuditDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contract_audit_detail',
    requires: ['AM.view.contract.DetailList', 'AM.view.contract.Form'],
    title: '订单审核',
    closable: true,
    border: false,
    padding: 0,
    layout: 'border',

    initComponent: function () {
        this.items = [
            {
                xtype: 'contract_form',
                contract: this.contract,
                contractStatus: 'view',
                resizable: true,
                region: 'west'
            },
            {
                xtype: 'panel',
                autoScroll: true,
                border: false,
                frame: true,
                layout: {
                  type: 'vbox',
                    align: 'stretch'
                },
                region: 'center',
                buttons: [
                    {
                        text: '审核通过',
                        action: 'pass_contract'
                    },
                    {
                        text: '审核不通过',
                        action: 'reject_contract'
                    }
                ],
                items: [
                    {
                        xtype: 'contract_detail_list',
                        flex: 1,
                        collapsible: true,
                        title: '合同当前详情',
                        contract: this.contract,
                        contractStatus: this.contractStatus,
                        params: {
                            'contractId': this.contract.get('id')
                        },
                        storeName: 'detail'
                    }
                ]
            }
        ];


        this.callParent(arguments);
    }
});