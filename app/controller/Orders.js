Ext.define('AM.controller.Orders', {
    extend: 'Ext.app.Controller',
    views: [
        'order.Detail',
        'order.General',
        'order.Audit'
    ],
    stores: [
        'Materials',
        'Customs',
        'OrderDetails',
        'AuditOrders',
        'Orders'
    ],
    models: ['Custom', 'Order'],

    refs: [
        {
            ref: 'panel',
            selector: 'order_panel'
        },

        {
            ref: 'list',
            selector: 'order_general > order_list'
        },
        {
            ref: 'searchPanel',
            selector: 'search_panel'
        },
        {
            ref: 'editButton',
            selector: '#J_OrderEdit'
        },
        {
            ref: 'addButton',
            selector: '#J_OrderAdd'
        },
        {
            ref: 'viewButton',
            selector: '#J_OrderView'
        }
    ],

    checkEnable: function (sm) {
        var len = sm.getSelection().length;
        this.getEditButton() && this.getEditButton().setDisabled(len !== 1);
        this.getViewButton().setDisabled(len !== 1);
    },
    addOrder: function () {
        var tab = Ext.widget('order_detail', {
            title: '新增订单',
            order: this.getModel('Order').create({
                salesManName: LoginUser.name,
                salesManId: LoginUser.id,
                saleGroup: LoginUser.saleGroup
            }),
            orderStatus: 'add'
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        tab.down('order_form').loadRecord(tab.order);
    },
    saveOrder: function (btn) {
        btn.setDisabled(true);
        var form = btn.up('order_detail').down('order_form'),
            record = form.order,
            values = form.getValues();
        if (!form.getForm().isValid()) {
            AM.error('错误!', "数据非法,请检查!");
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
                if (form.orderStatus == 'add') {
                    this.getStore('Orders').reload();
                    btn.setText("已保存");
                } else {
                    btn.setDisabled(false);
                }
                Ext.Msg.alert('', '订单操作成功!');
            }
        });
    },
    actionOrder: function (cmd) {
        var title = cmd === 'edit' ? '变更订单' : '查看订单';
        return function (btn) {
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
        };
    },

    cancelOrder: function (btn) {
        btn.setDisabled(true);
        this.application.confirm('注意', '确定要执行<font color="red">取消订单</font>操作?', function (btnId) {
            if (btnId == 'ok') {
                var order = btn.up('order_detail').order;
                order.set('status', 3);
                this.application.save(order, this, {
                    error: function () {
                        btn.setDisabled(false);
                    },
                    success: function () {
                        btn.setText("已取消");
                        Ext.Msg.alert('', '订单操作成功!');
                    }
                });
            }


        }, this);
    },

    printOrder: function (btn) {
        var order = btn.up('order_detail').order,
            data = order.getData(),
            detail = order.detail(),
            tpl = document.getElementById('printTpl').innerHTML;

        data.detail = [];
        detail.each(function (rec) {
            var recData = rec.getData();
            recData.deadline = Ext.Date.format(recData.deadline, 'Y年m月d日');
            data.detail.push(recData);
        });

        data.date = Ext.Date.format(data.date, 'Y年m月d日');

        var t = new Ext.XTemplate(tpl);
        var w = window.open('');
        w.document.write(t.apply(data));
        w.print();
    },

    searchOrder: function (btn) {
        var values = this.getSearchPanel().getValues();
        this.getStore('Orders').load({
            params: values
        });

    },
    init: function () {
        this.control({
            'order_general > order_list': {
                'selectionchange': this.checkEnable
            },
            '#J_OrderAdd': {
                'click': this.addOrder
            },
            'order_detail button[action=add_save]': {
                'click': this.saveOrder
            },
            'order_detail button[action=print]': {
                'click': this.printOrder
            },
            'order_detail button[action=cancel]': {
                'click': this.cancelOrder
            },
            'search_panel button[action=search_order]': {
                'click': this.searchOrder
            },

            '#J_OrderView': {
                'click': this.actionOrder('view')
            },
            '#J_OrderEdit': {
                click: this.actionOrder('edit')
            },
            '#J_OrderSearch': {
                click: function () {
                    this.getSearchPanel().toggleCollapse();
                }
            }
        });
    }
});