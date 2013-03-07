Ext.define('AM.widget.PwdDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.pwddialog',
    layout: 'fit',
    autoShow: true,
    border: false,
    title: '修改密码',
    modal: true,
    initComponent: function () {
       this.items = [
           {
               xtype: 'form',
               padding: 10,
               defaults: {
                   inputType: 'password'
               },
               frame: true,
               items: [
                   {
                       xtype: 'textfield',
                       name: 'password',
                       fieldLabel: '请输入原密码：'
                   },
                   {
                       xtype: 'textfield',
                       name: 'new_password',
                       fieldLabel: '输入新密码：'
                   },
                   {
                       xtype: 'textfield',
                       name: 'confirm_password',
                       fieldLabel: '再次输入新密码'
                   }
               ],

               buttons: [
                   {
                       text: '保存',
                       handler: this.savePwd
                   }, {
                       text: '取消',
                       handler: this.close,
                       scope: this
                   }
               ]

           }];
        this.callParent(arguments);
    },
    validate: function() {

    },
    savePwd: function(btn) {
        var url = AM.API['changePwd'],
            form = btn.down('form');
        if(this.validate()) {
            form.submit({
                url: url,
                success: function() {

                }
            })
        }

    }
});