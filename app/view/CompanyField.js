Ext.define('AM.view.CompanyField', {
    extend: 'AM.view.TplCombobox',
    alias:'widget.company_field',
    emptyText: '输入企业名称查询',
    autoSelect: false,
    displayField: 'companyName',
    valueField: 'companyName',
    forceSelection: true,
    listeners: {
        select: function(combo, records) {
            var id = records[0].get('id'),
                form = combo.up('form'),
                idField = form.getForm().findField('customId');
            idField.setValue(id);
        }
    },
    store: Ext.create('Ext.data.Store', {
        fields:['companyName'],
        proxy: AM.createProxy('company'),
        reader: AM.Reader,
        writer: AM.Writer
    })
});