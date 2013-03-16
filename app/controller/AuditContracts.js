Ext.define('AM.controller.AuditOrders', {
    extend: 'Ext.app.Controller',
    views: [
        'order.Audit',
        'order.AuditDetail'
    ],
    models: ['Order'],

    init: function () {

    }
})