/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-1-29
 * Time: 下午10:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.controller.Orders', {
    extend:'Ext.app.Controller',
    views:[
      /*  'order.List',
        'order.DetailList',*/
        'order.Detail',
        'order.General',
        'order.Audit'
    ],
    stores:[
        'Materials',
        'Customs',
        'SalesMen',
        'Orders'
    ],
    models:['Custom', 'Order'],

    refs:[
        {
            ref: 'panel',
            selector: 'orderpanel'
        },
       /* {
            ref: 'orderGeneral',
            selector: 'ordergeneral'
        },*/
        {
            ref:'list',
            selector:'orderlist'
        },
        {
            ref:'editButton',
            selector:'#J_OrderEdit'
        },
        {
            ref:'addButton',
            selector:'#J_OrderAdd'
        },
        {
            ref:'viewButton',
            selector:'#J_OrderView'
        }
    ],

    checkEnable: function(sm) {
        var len = sm.getSelection().length;
        this.getEditButton().setDisabled(len !== 1);
        this.getViewButton().setDisabled(len !== 1);
    },
    addOrder: function() {
        var tab = Ext.widget('orderdetail', {
            title: '新增订单'
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);
    },
    saveOrder: function(btn) {
       console.log(btn.up('orderdetail'));
    },
    init:function () {
         this.control({
             'orderlist': {
                 'selectionchange': this.checkEnable
             },
             '#J_OrderAdd': {
                 'click': this.addOrder
             },
             'orderdetail button[action=save]': {
                 'click': this.saveOrder
             }
         });
    }
});