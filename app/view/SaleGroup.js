/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-2-24
 * Time: 下午3:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.SaleGroup', {
    extend: 'Ext.form.field.ComboBox',
    alias:'widget.salegroup',
    name:'sale_group',
    fieldLabel:'销售组',
    queryMode:'local',
    store: Ext.create('Ext.data.Store', {
        fields:['sale_group', 'des'],
        data:[
            {sale_group:0, des:'城轨'},
            {sale_group:1, des:'机车'},
            {sale_group:2, des:'动车'},
            {sale_group:3, des:'新产业'},
            {sale_group:4, des:'销售管理'}
        ]
    }),
    valueField:'sale_group',
    displayField:'des',
    editable:false,
    allowBlank: false,
//    forceSelection:true,
    labelWidth:60,
    width:140,
    padding:5
});