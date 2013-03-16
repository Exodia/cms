Ext.define('AM.controller.AuditContracts', {
    extend: 'Ext.app.Controller',
    views: [
        'contract.Audit',
        'contract.AuditDetail'
    ],
    models: ['Contract'],
    refs: [
        {
            ref: 'panel',
            selector: 'contract_panel'
        },
        {
            ref: 'auditButton',
            selector: '#J_ContractAudit'
        },
        {
            ref: 'list',
            selector: 'contract_audit > contract_list'
        }
    ],

    checkEnable: function (sm) {
        var len = sm.getSelection().length;
        this.getAuditButton().setDisabled(len !== 1);
    },
    auditContract: function (btn) {

        var tab = Ext.widget('contract_audit_detail', {
            contract: this.getList().getSelectionModel().getSelection()[0]
        });
        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        tab.down('contract_form').loadRecord(tab.contract);
    },

    actionContract: function (status) {
        var msg = status === 1 ?
            '确定要执行<b style="color:green">审核通过</b>操作？' :
            '确定要执行<b style="color:red">审核不通过</b>操作？';

        return function (btn) {
            var contract = btn.up('contract_audit_detail').contract;
            this.application.confirm('注意', msg, function (btnId) {
                if (btnId === 'ok') {
                    contract.beginEdit();
                    contract.set('status', status);
                    this.saveAudit(contract);
                }
            }, this);
        };
    },
    saveAudit: function(contract) {
        contract.save({
            params:{
                audit: true
            },
            failure: function(record) {
                record.cancelEdit();
            },
            success: function(record) {
                record.endEdit();
            }
        });
    },
    init: function () {
        this.control({
            'contract_audit > contract_list': {
                selectionchange: this.checkEnable
            },
            '#J_ContractAudit': {
                click: this.auditContract
            },
            'contract_audit_detail button[action=pass_contract]': {
                click: this.actionContract(1)
            },
            'contract_audit_detail button[action=reject_contract]': {
                click: this.actionContract(2)
            }
        });
    }
});