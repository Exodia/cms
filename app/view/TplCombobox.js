Ext.define('AM.view.TplCombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.tplcombo',
    forceSelection: true,
    allowBlank: false,
    typeAhead: true,
    minChars: 3
});