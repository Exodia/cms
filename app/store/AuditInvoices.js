Ext.define('AM.store.AuditInvoices', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'AM.model.Invoice',
    proxy: {
        type: 'ajax',
        api: AM.API['invoice'],
        listeners: AM.ProxyListeners,
        extraParams: {
            status: 0
        },
        reader: AM.Reader,
        writer: AM.Writer
    }
});
