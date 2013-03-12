Ext.define('AM.view.CompanyField', {
    extend: 'AM.view.TplCombobox',
    alias:'widget.company_field',
    emptyText: '输入企业名称',
    autoSelect: false,
    forceSelection: false,
    displayField: 'companyName',
    store: Ext.create('Ext.data.Store', {
        fields:['companyName'],
        proxy: AM.createProxy('custom'),
        reader: AM.Reader,
        writer: AM.Writer
    })
});