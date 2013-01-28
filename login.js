/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-1-28
 * Time: 下午10:48
 * To change this template use File | Settings | File Templates.
 */
Ext.onReady(function () {
    var form = Ext.create('Ext.form.Panel', {
        title:'登陆系统',
        bodyPadding:15,
        width:300,

        url:'save-form.php',

        frame:true,
        layout:'anchor',
        margin:'200 auto 200 auto',
        defaults:{
            anchor:'100%'
        },

        // The fields
        defaultType:'textfield',
        items:[
            {
                fieldLabel:'用户名',
                name:'userName',
                blankText:'请输入用户名',
                allowBlank:false
            },
            {
                fieldLabel:'密码',
                name:'password',
                blankText:'请输入密码',
                inputType:'password',
                allowBlank:false
            }
        ],

        // Reset and Submit buttons
        buttons:[
            {
                text:'登陆',
                formBind:true, //only enabled once the form is valid
                disabled:true,
                handler:function () {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            success:function (form, action) {
                                Ext.Msg.alert('Success', action.result.msg);
                            },
                            failure:function (form, action) {
                                Ext.Msg.alert('Failed', action.result.msg);
                            }
                        });
                    }
                }
            }
        ]

    });

    Ext.create('Ext.container.Viewport', {
        layout:'hbox',
        frame:true,
        items:[form],
        layout: {
            type: 'hbox',
            align: 'middle ',
            pack: 'center'
        }
    })
});