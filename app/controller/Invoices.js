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

    validTotal: function (form, total) {
        var price = parseFloat(form.getForm().findField('invoiceMoney').getValue());
        if (Math.abs(total - price) < 1) {
            return true;
        }

        return false;
    },
    checkEnable: function (sm, rec) {
        var len = rec.length;
        this.getViewButton().setDisabled(len !== 1);
        this.getEditButton().setDisabled(len !== 1 || rec[0].get('status') == 1);
    },

    forcePass: function (btn, form) {
        Ext.Msg.show({
            title: '注意',
            msg: '发票金额与货物明细金额不符, <font red>强制通过</font>必须填写备注!',
            fn: function () {
                if (!Ext.String.trim(form.getForm().findField('info').getValue())) {
                    AM.error('错误', '请填写备注!!');
                } else {
                    this.saveInvoice(btn, form);
                }
            },
            scope: this,
            buttons: Ext.MessageBox.OKCANCEL,
            buttonText: {
                ok: '强制通过'
            },
            icon: Ext.MessageBox.WARNING
        });
    },

    saveInvoice: function (btn, form) {
        btn.setDisabled(true);
        var record = form.invoice,
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


    searchInvoice: function (btn) {
        var values = this.getSearchPanel().getValues();
        this.getStore('Invoices').load({
            params: values
        });

    },
    onSave: function (btn) {
        var detailPanel = btn.up('invoice_detail'),
            grid = detailPanel.down('invoice_detail_list'),
            form = detailPanel.down('invoice_form'),
            total = this.getTotalPrice(grid);

        if (!this.validTotal(form, total)) {
            this.forcePass(btn, form);

        } else {
            this.saveInvoice(btn, form);
        }


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
        var contractCode = btn.prev().getValue(),
            detail = btn.up('invoice_detail'),
            list = detail.down('invoice_detail_list'),
            ContractDetail = this.getContractDetailModel();

        Ext.Ajax.request({
            method: 'GET',
            params: {
                contractCode: contractCode
            },
            url: AM['API'].contractDetial.read,
            callback: function (op, success, res) {
                if (success) {
                    var obj = Ext.decode(res.responseText);

                    if (obj.success) {
                        var data = obj.data,
                            store = list.getStore();

                        data.remainAmount = data.contractAmount;
                        store.removeAll();
                        store.add(data);

                        return;
                    }

                }
                AM.error('错误', '获取合同失败,请重试!');
            },
            scope: this
        }/*, {

         success: function (record) {
         var data = record.getData(),
         store = list.getStore();

         data.remainAmount = data.contractAmount;
         store.removeAll();
         store.add(data);
         },
         scope: this

         }*/);

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
                this.getList().getSelectionModel().deselectAll();
                Ext.Msg.alert('注意！', '操作成功！');
            },
            scope: this
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
                'click': this.onSave
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