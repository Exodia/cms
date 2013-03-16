Ext.define('AM.controller.AuditOrders', {
    extend: 'Ext.app.Controller',
    views: [
        'order.Audit',
        'order.AuditDetail'
    ],
    models: ['Order'],
    refs: [
        {
            ref: 'panel',
            selector: 'order_panel'
        },
        {
            ref: 'auditButton',
            selector: '#J_OrderAudit'
        },
        {
            ref: 'list',
            selector: 'order_audit > order_list'
        }
    ],
    checkEnable: function (sm) {
        var len = sm.getSelection().length;
        this.getAuditButton().setDisabled(len !== 1);
    },
    auditOrder: function (btn) {
        var tab = Ext.widget('order_audit_detail', {
            order: this.getList().getSelectionModel().getSelection()[0]
        });

        var panel = this.getPanel();
        panel.add(tab);
        panel.setActiveTab(tab);

        var form = tab.down('order_form'),
            data = tab.order.getData();
        form.loadRecord(tab.order);
        form.down('datefield').setValue(new Date(data.date));
    },

    actionOrder: function (status) {
        var msg = status === 1 ?
            '确定要执行<b style="color:green">审核通过</b>操作？' :
            '确定要执行<b style="color:red">审核不通过</b>操作？';

        return function (btn) {
            var tab =  btn.up('order_audit_detail'),
                order = tab.order;

            this.application.confirm('注意', msg, function (btnId) {
                if (btnId === 'ok') {
                    order.beginEdit();
                    order.set('status', status);
                    this.saveAudit(order, tab);
                }
            }, this);
        };
    },
    saveAudit: function(order, tab) {
      order.save({
          params:{
              audit: true
          },
          failure: function(record) {
             record.cancelEdit();
          },
          success: function(record) {
              record.endEdit();
              tab.close();
          },
          scope: this
      });
    },
    init: function () {
        this.control({
            'order_audit > order_list': {
                selectionchange: this.checkEnable
            },
            '#J_OrderAudit': {
                click: this.auditOrder
            },
            'order_audit_detail button[action=pass_order]': {
                click: this.actionOrder(1)
            },
            'order_audit_detail button[action=reject_order]': {
                click: this.actionOrder(2)
            }
        });
    }
})