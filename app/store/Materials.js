Ext.define('AM.store.Materials', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Material',
    autoLoad: true,

    proxy: AM.createProxy('material')
});
