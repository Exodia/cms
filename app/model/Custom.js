Ext.define('AM.model.Custom', {
    extend:'Ext.data.Model',
    fields:['id', 'name', 'companyName', 'position', 'contact', 'comment'],
    proxy: AM.createProxy('custom')
});


