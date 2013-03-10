Ext.define('AM.store.AuditOrders', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'AM.model.Order',
    proxy: {
        type: 'ajax',
        api: AM.API['order'],
        listeners: AM.ProxyListeners,
        extraParams: {
            status: 0
        },
        reader: AM.Reader,
        writer: AM.Writer
    }
});
