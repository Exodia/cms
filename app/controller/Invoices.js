Ext.define('AM.controller.Invoices', {
    extend: 'Ext.app.Controller',
    views: [
       'invoice.Detail'
    ],
    stores: [
        'Invoices',
        'AuditInvoices'
    ],
    models: ['Invoice', 'InvoiceDetail'],

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
        }
    ],

    checkEnable: function (sm, rec) {
        var len = rec.length;
        this.getViewButton().setDisabled(len !== 1);
    },

    searchInvoice: function (btn) {
        var values = this.getSearchPanel().getValues();
        this.getStore('Invoices').load({
            params: values
        });

    },
    saveInvoice: function (btn) {
        btn.setDisabled(true);
        var form = btn.up('invoice_detail').down('invoice_form'),
            record = form.invoice,
            values = form.getValues();
        if(!form.getForm().isValid()) {
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

    viewInvoice: function () {
        var tab = Ext.widget('invoice_detail', {
            title: '合同详情',
            invoiceStatus: 'view',
            invoice: this.getList().getSelectionModel().getSelection()[0]
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        tab.down('invoice_form').loadRecord(tab.invoice);
    },

    fileInvoice: function () {
        var rec = this.getList().getSelectionModel().getSelection()[0],
            msg = '确定要<b style="color:green">归档</b>？';


        this.application.confirm('注意', msg, function (btnId) {
            if (btnId === 'ok') {
                rec.beginEdit();
                rec.set('status', 3);
                this.saveFile(rec);
            }
        }, this);

    },


    saveFile: function (invoice) {
        invoice.save({
            params:{
                store: true
            },
            failure: function(record) {
                record.cancelEdit();
            },
            success: function(record) {
                record.endEdit();
                Ext.Msg.alert('注意！', '操作成功！');
            }
        });
    },


    setFormPrice: function(grid) {
        var totalPrice = 0;

        grid.getStore().each(function (rec) {
            var amount = rec.get('invoiceAmount') || 0,
                unit_price = rec.get('unitPrice');

            totalPrice += amount * unit_price;
        }, grid);

        grid.invoice.set({
            totalPrice: totalPrice.toFixed(2),
            taxTotalPrice: (totalPrice * (1 + AM.TAX)).toFixed(2)
        });

        grid.prev().loadRecord(grid.invoice);
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

            '#J_InvoiceFile': {
                'click': this.fileInvoice
            },

            '#J_InvoiceSearch': {
                click: function () {
                    this.getSearchPanel().toggleCollapse();
                }
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

                },

                edit: function (editor, e) {
                    var record = e.record,
                        field = e.field;

                    switch (field) {
                        case 'invoiceAmount':
                        case 'unitPrice':
                            var amount = record.get('invoiceAmount'),
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