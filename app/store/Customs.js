Ext.define('AM.store.Customs', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Custom',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: AM.API['custom'],
        listeners: AM.ProxyListeners,
        reader: AM.Reader,
        writer: AM.Writer
    }
});
