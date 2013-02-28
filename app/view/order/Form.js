/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-2-26
 * Time: 上午11:11
 */
Ext.define('AM.view.order.Form', {
    extend:'Ext.form.Panel',
    requires:['AM.view.SaleGroup'],
    alias:'widget.orderform',
    layout:'border',
    collapsible:true,
    frame:true,
    region:'west',
    layout:'vbox',
    padding:15,
    defaultType:'textfield',
    defaults:{
        labelAlign:'top',
        margin: '15 0',
        width:150
    },
    width:200,
    items:[
        {
            fieldLabel:'项目号',
            name:'project',
            allowBlank:false
        },
        {
            fieldLabel:'订单日期',
            name:'date',
            format: 'Y年m月d日',
            xtype:'datefield'
        },
        {
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
            valueField: 'id',
            name:'custom',
            xtype:'combo'
        },
        {
            fieldLabel:'销售组',
            width:150,
            padding:0,
            name:'sale_group',
            xtype:'salegroup'
        },
        {
            fieldLabel:'销售员',
            name:'salesman',
            xtype:'combo'
        }
    ]
});