/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-1-26
 * Time: 下午6:00
 */
Ext.define('AM.view.user.Edit', {
    extend:'Ext.window.Window',
    alias:'widget.useredit',
    modal:true,
    title:'编辑用户',
    layout:'fit',
    autoShow:true,

    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                width:400,
                padding:"10 10 10 35",
                frame:true,

                layout:{
                    type:'table',
                    columns:2
                },
                defaults:{
                    allowBlank:false
                },
                items:[
                    {
                        colspan:2,
                        xtype:'numberfield',
                        name:'work_num',
                        fieldLabel:'工号',
                        labelWidth:60,
                        minValue:0,
                        width:260,
                        padding:5
                    },
                    {
                        xtype:'textfield',
                        name:'name',
                        fieldLabel:'姓名',
                        labelWidth:60,
                        width:150,
                        padding:5,
                        margin:'0 20 0 0'
                    },
                    {
                        xtype:'combo',
                        name:'user_type',
                        fieldLabel:'职位',
                        queryMode:'local',
                        fields:['user_type', 'des'],
                        queryMode:'local',
                        store:Ext.create('Ext.data.Store', {
                            fields:['user_type', 'des'],
                            data:[
                                {user_type:0, des:'管理员'},
                                {user_type:1, des:'发运员'}
                            ]
                        }),
                        valueField:'user_type',
                        displayField:'des',
                        editable:false,
                        forceSelection:true,
                        labelWidth:30,
                        width:120,
                        padding:5
                    },
                    {
                        xtype:'textfield',
                        colspan:2,
                        name:'address',
                        fieldLabel:'住址',
                        labelWidth:60,
                        allowBlank:true,
                        width:260,
                        padding:5
                    },
                    {
                        xtype:'textfield',
                        name:'contact',
                        colspan:2,
                        fieldLabel:'联系方式',
                        labelWidth:60,
                        width:260,
                        padding:5
                    },
                    {
                        xtype:'textfield',
                        colspan:2,
                        name:'email',
                        fieldLabel:'Email',
                        labelWidth:60,
                        width:260,
                        vtype:'email',
                        vtypeText:'请输入合法的Email地址',
                        allowBlank:true,
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