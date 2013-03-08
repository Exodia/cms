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
            order: this.getStore('Orders').add({})[0],
            orderStatus: 'edit'
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);
    },
    saveOrder: function (btn) {
        var form = btn.up('orderdetail').down('orderform'),
            record = form.order,
            values = form.getValues();
        record.set(values);
        this.application.sync(this.getStore('Orders'), this);
    },
    viewOrder: function () {
        var tab = Ext.widget('orderdetail', {
            order: this.getList().getSelectionModel().getSelection()[0],
            orderStatus: 'view'
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        var form = tab.down('orderform'),
            data = tab.order.getData();
        form.loadRecord(tab.order);
        form.down('datefield').setValue(new Date(data.date));
        form.down('custom').setValue(data.custom.id);
        form.down('salesman').setValue(data.salesman.id);
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
                'click': this.viewOrder
            }
        });
    }
});