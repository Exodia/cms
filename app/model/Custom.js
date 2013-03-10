Ext.define('AM.model.Custom', {
    extend:'Ext.data.Model',
    fields:['id', 'name', 'companyName', 'position', 'officeNumber', 'mobileNumber', 'comment'],
    proxy: AM.createProxy('custom')
});


