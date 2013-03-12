Ext.define('AM.store.Contracts', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'AM.model.Contract',
    proxy: AM.createProxy('contract')
});
