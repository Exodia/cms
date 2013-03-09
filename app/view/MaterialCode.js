Ext.define('AM.view.MaterialCode', {
    extend: 'AM.view.TplCombobox',
    requires:['AM.store.Materials'],
    alias:'widget.material_code',
    store:'Materials',
    forceSelection:true,
    minChars: 9,
    valueField:'code',
    displayField:'code'

});