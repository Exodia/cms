/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-2-24
 * Time: 下午3:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.view.SaleGroup', {
    extend: 'Ext.form.field.ComboBox',
    alias:'widget.sale_group',
    fieldLabel:'销售组',
    queryMode:'local',
    store: Ext.create('Ext.data.Store', {
        fields:['saleGroup', 'des'],
        data:[
            {saleGroup:0, des:'城轨'},
            {saleGroup:1, des:'机车'},
            {saleGroup:2, des:'动车'},
            {saleGroup:3, des:'新产业'},
            {saleGroup:4, des:'销售管理'}
        ]
    }),
    valueField:'saleGroup',
    displayField:'des',
    editable:false,
    forceSelection:true,
    labelWidth:60,
    width:140,
    padding:5
});