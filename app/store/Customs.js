Ext.define('AM.store.Customs', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Custom',
    autoLoad: true,

    proxy: AM.createProxy('custom')
});
