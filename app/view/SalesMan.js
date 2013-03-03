/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-2-24
 * Time: 下午3:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.SalesMan', {
    extend: 'AM.view.TplCombobox',
//    requires: ['AM.store.SalesMen'],
    alias:'widget.salesman',
    name:'salesman',
    fieldLabel:'订货客户',
    store: 'SalesMen'
});