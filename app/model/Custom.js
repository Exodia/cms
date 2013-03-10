Ext.define('AM.model.Custom', {
    extend:'Ext.data.Model',
    fields:['id', 'name', 'companyName', 'contact', 'comment'],
    proxy: AM.createProxy('custom')
});


