Ext.define('AM.store.Users', {
    extend: 'Ext.data.Store',
    model: 'AM.model.User',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: AM.API['user'],
        listeners: AM.ProxyListeners,
        writer: AM.Writer,
        reader: AM.Reader
    }
});