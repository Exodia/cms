Ext.define('AM.view.custom.Edit', {
    extend:'Ext.window.Window',
    requires: ['AM.view.CompanyField'],
    alias:'widget.custom_edit',
    modal:true,
    title:'编辑客户信息',
    layout:'fit',
    autoShow:true,

    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                width:440,
                padding:"10 10 10 25",
                frame:true,
                defaults:{
                    allowBlank:false,
                    xtype: 'textfield',
                    labelWidth:60,
                    width: 370,
                    colspan: 2
                },
                layout:{
                    type:'table',
                    columns:2
                },
                items:[
                    {
                        name:'companyName',
                        xtype: 'company_field',
                        forceSelection: false,
                        fieldLabel:'企业名称'
                    },
                    {
                        name:'name',
                        fieldLabel:'姓名',
                        colspan: 1 ,
                        width: 150
                    },
                    {
                        fieldLabel: '职务',
                        width: 130,
                        name: 'position',
                        colspan: 1
                    },

                    {
                        name:'mobileNumber',
                        width: 170,
                        padding: '0 10 0 0',
                        colspan: 1,
                        fieldLabel:'手机号码'
                    },
                    {
                        name:'officeNumber',
                        width: 190,
                        colspan: 1,
                        fieldLabel:'办公电话'
                    },
                    {
                        name: 'comment',
                        fieldLabel: '备注',
                        allowBlank: true,
                        xtype: 'textareafield'
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