/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-2-24
 * Time: 下午3:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.Custom', {
    extend: 'AM.view.TplCombobox',
    alias:'widget.custom',
    name:'custom',
    fieldLabel:'订货客户',
    store: 'Customs'
});