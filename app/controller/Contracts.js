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
            ref: 'fileButton',
            selector: '#J_ContractFile'
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

    checkEnable: function (sm, rec) {
        var len = rec.length;
        this.getViewButton().setDisabled(len !== 1);
        this.getFileButton().setDisabled(len !== 1 || rec[0].get('status') !== 1);
    },

    searchContract: function (btn) {
        var values = this.getSearchPanel().getValues();
        this.getStore('Contracts').load({
            params: values
        });

    },
    saveContract: function (btn) {
        btn.setDisabled(true);
        var form = btn.up('contract_detail').down('contract_form'),
            record = form.contract,
            values = form.getValues();
        if(!form.getForm().isValid()) {
            AM.error('错误', '数据有误,请检查!');
            return;
        }

        record.beginEdit();
        record.set(values);
        record.setDirty();
        this.application.save(record, this, {
            error: function () {
                btn.setDisabled(false);
            },
            success: function () {
                this.getStore('Contracts').reload();
                btn.setText("已保存");
                Ext.Msg.alert('注意', '合同保存成功！');
            }
        });
    },
    addContract: function () {
        var tab = Ext.widget('contract_detail', {
            title: '新增合同',
            contract: this.getModel('Contract').create({
                salesManName: LoginUser.name,
                salesManId: LoginUser.id
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

        tab.down('contract_form').loadRecord(tab.contract);
    },

    fileContract: function () {
        var rec = this.getList().getSelectionModel().getSelection()[0],
            msg = '确定要<b style="color:green">归档</b>？';


        this.application.confirm('注意', msg, function (btnId) {
            if (btnId === 'ok') {
                rec.beginEdit();
                rec.set('status', 3);
                this.application.save(rec, this, {
                    success: function() {
                        this.getFileButton().setDisabled(true);
                    }
                });
            }
        }, this);

    },

    setFormPrice: function(grid) {
        var totalPrice = 0;

        grid.getStore().each(function (rec) {
            var amount = rec.get('contractAmount') || 0,
                unit_price = rec.get('unitPrice');

            totalPrice += amount * unit_price;
        }, grid);

        grid.contract.set({
            totalPrice: totalPrice.toFixed(2),
            taxTotalPrice: (totalPrice * (1 + AM.TAX)).toFixed(2)
        });

        grid.prev().loadRecord(grid.contract);
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

            '#J_ContractFile': {
                'click': this.fileContract
            },

            '#J_ContractSearch': {
                click: function () {
                    this.getSearchPanel().toggleCollapse();
                }
            },

            'contract_detail_list': {
                beforeedit: function (editor, e) {
                    var record = e.record,
                        field = e.field,
                        column = e.column;

                    if (field !== 'contractAmount') {
                        return;
                    }

                    column.getEditor(record).setMaxValue(record.get('remainAmount'));

                },

                edit: function (editor, e) {
                    var record = e.record,
                        field = e.field;

                    switch (field) {
                        case 'contractAmount':
                        case 'unitPrice':
                            var amount = record.get('contractAmount'),
                                unit_price = record.get('unitPrice');

                            if (typeof unit_price === 'number') {
                                record.set('unitTaxPrice', unit_price * (AM.TAX + 1));
                                amount && amount > 0 && this.setFormPrice(e.grid);
                            }


                            break;
                    }
                }
            }
        });
    }
});