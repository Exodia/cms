Ext.define('AM.controller.Invoices', {
    extend: 'Ext.app.Controller',
    views: [
        'invoice.Detail'
    ],
    stores: [
        'Invoices',
        'AuditInvoices'
    ],
    models: ['Invoice', 'InvoiceDetail', 'ContractDetail'],

    refs: [
        {
            ref: 'panel',
            selector: 'invoice_panel'
        },

        {
            ref: 'list',
            selector: 'invoice_general > invoice_list'
        },
        {
            ref: 'searchPanel',
            selector: 'invoice_search_panel'
        },

        {
            ref: 'addButton',
            selector: '#J_InvoiceAdd'
        },
        {
            ref: 'viewButton',
            selector: '#J_InvoiceView'
        },
        {
            ref: 'editButton',
            selector: '#J_InvoiceEdit'
        }
    ],

    forcePass: function() {

    },
    checkEnable: function (sm, rec) {
        var len = rec.length;
        this.getViewButton().setDisabled(len !== 1);
        this.getEditButton().setDisabled(len !== 1 || rec[0].get('status') == 1);
    },

    searchInvoice: function (btn) {
        var values = this.getSearchPanel().getValues();
        this.getStore('Invoices').load({
            params: values
        });

    },
    saveInvoice: function (btn) {
        var grid = btn.up('invoice_detail').down('invoice_detail_list'),
            total = this.getTotalPrice(grid);



        btn.setDisabled(true);
        var form = btn.up('invoice_detail').down('invoice_form'),
            record = form.invoice,
            values = form.getValues();
        if (!form.getForm().isValid()) {
            AM.error('错误', '数据有误,请检查!');
            btn.setDisabled(false);
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
                this.getStore('Invoices').reload();
                btn.setText("已保存");
                Ext.Msg.alert('注意', '合同保存成功！');
            }
        });
    },
    addInvoice: function () {
        var tab = Ext.widget('invoice_detail', {
            title: '新增发票',
            invoice: this.getModel('Invoice').create({
                salesManName: LoginUser.name,
                salesManId: LoginUser.id
            }),
            invoiceStatus: 'add'
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        tab.down('invoice_form').loadRecord(tab.invoice);
    },

    editInvoice: function () {
        var tab = Ext.widget('invoice_detail', {
            title: '变更发票',
            invoice: this.getList().getSelectionModel().getSelection()[0],
            invoiceStatus: 'edit'
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        var form = tab.down('invoice_form');
        form.loadRecord(tab.invoice);
        form.down('company_field').setRawValue(tab.invoice.get('companyName'));
    },

    addContract: function (btn) {
        var id = btn.prev().getValue(),
            detail = btn.up('invoice_detail'),
            list = detail.down('invoice_detail_list'),
            ContractDetail = this.getContractDetailModel();

        ContractDetail.load(id, {
            failure: function () {
                AM.error('错误', '获取合同失败,请重试!');
            },
            success: function (record) {
                var data = record.getData(),
                    store = list.getStore();

                data.remainAmount = data.contractAmount;
                store.removeAll();
                store.add(data);
            },
            scope: this

        });

    },

    viewInvoice: function () {
        var tab = Ext.widget('invoice_detail', {
            title: '发票详情',
            invoiceStatus: 'view',
            invoice: this.getList().getSelectionModel().getSelection()[0]
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        tab.down('invoice_form').loadRecord(tab.invoice);
    },

    confirmInvoice: function () {
        var rec = this.getList().getSelectionModel().getSelection()[0],
            msg = '确定要<b style="color:green">确认</b>该发票？';


        this.application.confirm('注意', msg, function (btnId) {
            if (btnId === 'ok') {
                rec.beginEdit();
                rec.set('status', 1);
                this.saveConfirm(rec);
            }
        }, this);

    },


    saveConfirm: function (invoice) {
        invoice.save({
            params: {
                confirm: true
            },
            failure: function (record) {
                record.cancelEdit();
            },
            success: function (record) {
                record.endEdit();
                Ext.Msg.alert('注意！', '操作成功！');
            }
        });
    },


    getTotalPrice: function (grid) {
        var totalPrice = 0;

        grid.getStore().each(function (rec) {
            var amount = rec.get('invoiceAmount') || 0,
                unit_price = rec.get('unitPrice');

            totalPrice += amount * unit_price;
        }, grid);

        return totalPrice;
    },


    init: function () {
        this.control({
            'invoice_general > invoice_list': {
                'selectionchange': this.checkEnable
            },
            '#J_InvoiceAdd': {
                'click': this.addInvoice
            },
            'invoice_detail button[action=add_save]': {
                'click': this.saveInvoice
            },

            'invoice_search_panel button[action=search_invoice]': {
                'click': this.searchInvoice
            },
            '#J_InvoiceView': {
                'click': this.viewInvoice
            },

            '#J_InvoiceEdit': {
                'click': this.editInvoice
            },

            '#J_InvoiceSearch': {
                click: function () {
                    this.getSearchPanel().toggleCollapse();
                }
            },

            'invoice_detail button[action=add_contract]': {
                click: this.addContract
            },

            'invoice_detail button[action=invoice_confirm]': {
                click: this.confirmInvoice
            },

            'invoice_detail_list': {
                beforeedit: function (editor, e) {
                    var record = e.record,
                        field = e.field,
                        column = e.column;

                    if (field !== 'invoiceAmount') {
                        return;
                    }

                    column.getEditor(record).setMaxValue(record.get('remainAmount'));

                }
            }
        });
    }
});