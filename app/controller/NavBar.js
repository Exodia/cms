Ext.define('AM.controller.NavBar', {
    extend: 'Ext.app.Controller',
    views: [
        'NavBar',
        'user.Edit'
    ],

    savePwd: function (btn) {
        var url = AM.API['changePwd'],
            form = btn.up('form');
        if (this.validate(form)) {
            form.submit({
                url: url,
                success: function () {
                    Ext.Msg.alert('注意', '密码修改成功！');
                    form.up('pwddialog').close();
                },
                failure: function (form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            AM.error('错误', '网络连接失败，请重试！');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            AM.error('错误', action.result.msg);
                    }
                },
                scope: this
            });
        }

    },
    validate: function (form) {
        var values = form.getValues();
        if(!values.password) {
            AM.error('错误', '原密码不得为空！');
            return false;
        }
        if (values.confirm_password.length < 4 || values.new_password < 4) {
            AM.error('错误', '密码长度不得小于4个字符！');
            return false;
        }
        if (values.confirm_password !== values.new_password) {
            AM.error('错误', '两次密码输入不一致！');
            return false;
        }

        return true;
    },
    init: function () {
        this.control({
            'navbar': {
                'render': function () {
                    Ext.get('changePwd').on('click', function () {
                        Ext.widget('pwddialog');
                    });

                    Ext.get('viewInfo').on('click', function () {
                        var view = Ext.widget('user_edit', {
                                status: 'view'
                            }),
                            form =  view.down('form');

                        form.getForm().setValues(window.LoginUser);
                    });
                }
            },
            'pwddialog button[action=save_pwd]': {
                'click': this.savePwd
            }
        });
    }
})