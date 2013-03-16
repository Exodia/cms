Ext.define('AM.controller.Contracts', {
    extend: 'Ext.app.Controller',
    views: [
        'MaterialCode',
        'contract.Detail',
        'contract.List'
    ],
    stores: [
        'Contracts',
        'AuditContracts'
    ],
    models: ['Contract', 'ContractDetail'],

    refs: [
        {
            ref: 'panel',
            selector: 'contract_panel'
        },

        {
            ref: 'list',
            selector: 'contract_general > contract_list'
        },
        {
            ref: 'searchPanel',
            selector: 'contract_search_panel'
        },
        {
            ref: 'editButton',
            selector: '#J_ContractEdit'
        },
        {
            ref: 'addButton',
            selector: '#J_ContractAdd'
        },
        {
            ref: 'viewButton',
            selector: '#J_ContractView'
        }
    ],

    checkEnable: function (sm) {
        var len = sm.getSelection().length;
        this.getViewButton().setDisabled(len !== 1);
    },

    searchContract: function (btn) {
        var values = this.getSearchPanel().getValues();
        this.getStore('Contracts').load({
            params: values
        });

    },
    saveContract: function () {

    },
    addContract: function () {
        var tab = Ext.widget('contract_detail', {
            title: '新增合同',
            contract: this.getModel('Contract').create({
                salesManName: LoginUser.name,
                salesManId : LoginUser.id
            }),
            contractStatus: 'add'
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        tab.down('contract_form').loadRecord(tab.contract);
    },

    viewContract: function () {
        var tab = Ext.widget('contract_detail', {
            title: '合同详情',
            contractStatus: 'view',
            contract: this.getList().getSelectionModel().getSelection()[0]
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        var form = tab.down('contract_form'),
            data = tab.contract.getData();

        form.loadRecord(tab.contract);
    },

    init: function () {
        this.control({
            'contract_general > contract_list': {
                'selectionchange': this.checkEnable
            },
            '#J_ContractAdd': {
                'click': this.addContract
            },
            'contract_detail button[action=add_save]': {
                'click': this.saveContract
            },

            'contract_search_panel button[action=search_contract]': {
                'click': this.searchContract
            },
            '#J_ContractView': {
                'click': this.viewContract
            },

            '#J_ContractSearch': {
                click: function () {
                    this.getSearchPanel().toggleCollapse();
                }
            }
        });
    }
});