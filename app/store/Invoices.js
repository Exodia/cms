Ext.define('AM.store.Invoices', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'AM.model.Invoice',
    proxy: AM.createProxy('invoice')
});
