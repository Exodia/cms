Ext.define('AM.store.Transports', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Transport',
    autoLoad: true,

    proxy: AM.createProxy('transport')
});