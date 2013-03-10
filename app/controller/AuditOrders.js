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
    init: function () {
        this.control({
            'order_audit > order_list': {
                selectionchange: this.checkEnable
            },
            '#J_OrderAudit': {
                click: this.auditOrder
            },
            'order_audit_detail button[action]': {

            }
        });
    }
})