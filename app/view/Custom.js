/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-2-24
 * Time: 下午3:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.Custom', {
    extend: 'Ext.form.field.ComboBox',
    alias:'widget.custom',
    name:'custom',
    fieldLabel:'订货客户',
    store: 'Customs',
    queryMode:'local',
    displayField: 'name',
    tpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
        '<div class="x-boundlist-item">{id} - {name}</div>',
        '</tpl>'
    ),
    displayTpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
        '{id} - {name}',
        '</tpl>'
    ),
    forceSelection: true,
    typeAhead: true,
    valueField: 'id'
});