Ext.define('AM.widget.PwdDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.pwddialog',
    layout: 'fit',
    width: 265,
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
                       action: 'save_pwd'

                   }, {
                       text: '取消',
                       handler: this.close,
                       scope: this
                   }
               ]

           }];
       this.callParent(arguments);
    }
});