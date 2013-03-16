Ext.define('AM.store.AuditContracts', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'AM.model.Contract',
    proxy: {
        type: 'ajax',
        api: AM.API['contract'],
        listeners: AM.ProxyListeners,
        extraParams: {
            status: 0
        },
        reader: AM.Reader,
        writer: AM.Writer
    }
});
