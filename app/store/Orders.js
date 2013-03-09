Ext.define('AM.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Order',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: AM.API['order'],
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
