Ext.define('AM.controller.Orders', {
    extend: 'Ext.app.Controller',
    views: [
        /*  'order.List',
         'order.DetailList',*/
        'order.Detail',
        'order.General',
        'order.Audit'
    ],
    stores: [
        'Materials',
        'Customs',
        'SalesMen',
        'OrderDetails',
        'Orders'
    ],
    models: ['Custom', 'Order'],

    refs: [
        {
            ref: 'panel',
            selector: 'orderpanel'
        },
        /* {
         ref: 'orderGeneral',
         selector: 'ordergeneral'
         },*/
        {
            ref: 'list',
            selector: 'orderlist'
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
        this.getEditButton().setDisabled(len !== 1);
        this.getViewButton().setDisabled(len !== 1);
    },
    addOrder: function () {
        var tab = Ext.widget('orderdetail', {
            title: '新增订单',
            order: this.getModel('Order').create({
                salesManName: LoginUser.name,
                salesManId : LoginUser.id,
                saleGroup: LoginUser.saleGroup
            }),
            orderStatus: 'add'
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        tab.down('orderform').loadRecord(tab.order);
    },
    saveOrder: function (btn) {
        btn.setDisabled(true);
        var form = btn.up('orderdetail').down('orderform'),
            record = form.order,
            values = form.getValues();
        record.set(values);
        record.setDirty();
        this.application.save(record, this, {
            error: function() {
                record.reject();
                btn.setDisabled(false);
            },
            success: function() {
                if(form.orderStatus == 'add') {
                    this.getStore('Orders').reload();
                    btn.setText("已保存");
                } else {
                    btn.setDisabled(false);
                }
            }
        });
    },
    actionOrder: function(cmd) {
       var title = cmd === 'edit'? '变更订单' : '查看订单';
        return function(btn) {
            var tab = Ext.widget('orderdetail', {
                title: title,
                order: this.getList().getSelectionModel().getSelection()[0],
                orderStatus: cmd
            });

            var panel = this.getPanel();
            panel.add(tab);
            panel.setActiveTab(tab);

            var form = tab.down('orderform'),
                data = tab.order.getData();
            form.loadRecord(tab.order);
            form.down('datefield').setValue(new Date(data.date));
        }
    },

    printOrder: function (btn) {
        var order = btn.up('orderdetail').order,
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
//        w.print();
    },
    init: function () {
        this.control({
            'orderlist': {
                'selectionchange': this.checkEnable
            },
            '#J_OrderAdd': {
                'click': this.addOrder
            },
            'orderdetail button[action=add_save]': {
                'click': this.saveOrder
            },
            'orderdetail button[action=print]': {
                'click': this.printOrder
            },
            '#J_OrderView': {
                'click': this.actionOrder('view')
            },
            '#J_OrderEdit': {
                click: this.actionOrder('edit')
            }
        });
    }
});