/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-1-26
 * Time: 下午6:00
 */
Ext.define('AM.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.useredit',
    modal:true,
    title: '编辑用户',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                width: 350,
                padding:"10 10 10 35",
                frame: true,
                layout:'anchor',
                defaults:{
                    allowBlank: false
                },
                items: [
                    {
                        xtype: 'numberfield',
                        name : 'work_num',
                        fieldLabel: '工号',
                        labelWidth: 60,
                        minValue:0,
                        width: 260,
                        padding:5
                    },
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: '姓名',
                        labelWidth: 60,
                        width: 260,
                        padding:5
                    },
                    {
                        xtype: 'textfield',
                        name : 'user_type',
                        fieldLabel: '职位',
                        labelWidth: 60,
                        width: 260,
                        padding:5
                    },{
                        xtype: 'textfield',
                        name : 'address',
                        fieldLabel: '住址',
                        labelWidth: 60,
                        allowBlank:true,
                        width: 260,
                        padding:5
                    },{
                        xtype: 'textfield',
                        name : 'contact',
                        fieldLabel: '联系方式',
                        labelWidth: 60,
                        width: 260,
                        padding:5
                    },{
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email',
                        labelWidth: 60,
                        width: 260,
                        vtype:'email',
                        allowBlank:true,
                        padding:5
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: '保存',
                action: 'save'
            },
            {
                text: '取消',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});