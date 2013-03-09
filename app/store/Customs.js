Ext.define('AM.store.Customs', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Custom',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: AM.API['custom'],
        reader: AM.Reader,
        writer: AM.Writer
    }
});
