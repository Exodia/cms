/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-2-24
 * Time: 下午3:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.Custom', {
    extend: 'Ext.form.field.Trigger',
    alias:'widget.custom',
    name:'customName',
    editable: false,
    fieldLabel:'订货客户'
//    store: 'Customs'
});