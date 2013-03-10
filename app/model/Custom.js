Ext.define('AM.model.Custom', {
    extend:'Ext.data.Model',
    fields:['id', 'name', 'companyName', 'contact', 'comment'],
    proxy: {
        type: 'ajax',
        api: AM.API['custom'],
        listeners: AM.ProxyListeners,
        reader: AM.Reader,
        writer: AM.Writer
    }
});