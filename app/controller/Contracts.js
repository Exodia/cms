Ext.define('AM.controller.Contracts', {
    extend: 'Ext.app.Controller',
    views: [
        'contract.List'
    ],
    stores: [
        'Contracts'
    ],
    models: ['Contract'],

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
            selector: 'search_panel'
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
        this.getEditButton().setDisabled(len !== 1);
        this.getViewButton().setDisabled(len !== 1);
    },

    searchContract: function (btn) {
        var values = this.getSearchPanel().getValues();
        this.getStore('Contracts').load({
            params: values
        });

    },
    saveContract: function() {

    },
    addContract: function() {

    },
    actionContract: function(cmd) {
        var title = cmd === 'edit'? '变更订单' : '查看订单';
        return function(btn) {
            var tab = Ext.widget('order_detail', {
                title: title,
                order: this.getList().getSelectionModel().getSelection()[0],
                orderStatus: cmd
            });

            var panel = this.getPanel();
            panel.add(tab);
            panel.setActiveTab(tab);

            var form = tab.down('order_form'),
                data = tab.order.getData();
            form.loadRecord(tab.order);
            form.down('datefield').setValue(new Date(data.date));
        }
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

            'contract_detail button[action=search_order]': {
                'click': this.searchContract
            },
            '#J_ContractView': {
                'click': this.actionContract('view')
            },
            '#J_ContractEdit': {
                click: this.actionContract('edit')
            },
            '#J_ContractSearch': {
                click: function () {
                    this.getSearchPanel().toggleCollapse();
                }
            }
        });
    }
});