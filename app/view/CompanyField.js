Ext.define('AM.view.CompanyField', {
    extend: 'AM.view.TplCombobox',
    alias:'widget.company_field',
    valueField: 'id',
    emptyText: '输入企业名称查询',
    autoSelect: false,
    forceSelection: false,
    store: Ext.create('Ext.data.Store', {
        proxy: AM.createProxy('company'),
        reader: AM.Reader,
        writer: AM.Writer
    }),
    listeners: {
        select: function(combo, records) {
            var id = records[0].get('id'),
                form = combo.up('order_form'),
                idField = form.getForm().findField('customId');
            idField.setValue(id);
        }
    }

});