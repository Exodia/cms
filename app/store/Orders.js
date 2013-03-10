Ext.define('AM.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Order',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: AM.API['order'],
        listeners: AM.ProxyListeners,
        reader: AM.Reader
    }
});
