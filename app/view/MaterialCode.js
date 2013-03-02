/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-2-24
 * Time: 下午3:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.MaterialCode', {
    extend: 'Ext.form.field.ComboBox',
    alias:'widget.materialcode',
    store: 'Materials',
    forceSelection: true,
//    queryMode: 'local',
    typeAhead: true,
    valueField: 'code',
    displayField: 'code'
});