/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-1-26
 * Time: 下午6:00
 */
Ext.define('AM.view.transport.Edit', {
    extend:'Ext.window.Window',
    alias:'widget.transportedit',
    modal:true,
    title:'编辑物流信息',
    layout:'fit',
    autoShow:true,

    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                width:365,
                padding:"10 10 10 35",
                frame:true,
                defaults:{
                    allowBlank:false
                },
                defaultType: 'textfield',
                items:[
                    {
                        name:'code',
                        fieldLabel:'编码',
                        labelWidth:80,
                        width:260,
                        padding:5
                    },
                    {
                        name:'name',
                        fieldLabel:'名称',
                        labelWidth:80,
                        width:260,
                        padding:5,
                        margin:'0 20 0 0'
                    },
                    {
                        xtype:'combo',
                        name:'unit',
                        fieldLabel:'基本计量单位',
                        queryMode:'local',
                        fields:['unit', 'des'],
                        queryMode:'local',
                        store:Ext.create('Ext.data.Store', {
                            fields:['unit', 'des'],
                            data:[
                                {unit:0, des:'件'}
                            ]
                        }),
                        valueField:'unit',
                        displayField:'des',
                        editable:false,
                        forceSelection:true,
                        labelWidth:80,
                        width:140,
                        padding:5,
                        margin:'3 0 3'
                    },

                    {
                        name:'creator',
                        fieldLabel:'创建人',
                        labelWidth:80,
                        width:150,
                        padding:5
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text:'保存',
                action:'save'
            },
            {
                text:'取消',
                scope:this,
                handler:this.close
            }
        ];

        this.callParent(arguments);
    }
});