/**
 * Created with JetBrains WebStorm.
 * User: tafeng.dxx
 * Date: 13-1-26
 * Time: 下午5:39
 */
Ext.define('AM.controller.Users', {
    extend:'Ext.app.Controller',
    views:[
        'user.List',
        'user.Edit'
    ],
    stores:[
        'Users'
    ],
    models:['User'],
    refs:[
        {
            ref:'list',
            selector:'userlist'
        },
        {
            ref:'editButton',
            selector:'#J_UserEdit'
        },
        {
            ref:'delButton',
            selector:'#J_UserDelete'
        }
    ],
    init:function () {
        this.control({
            '#J_UserAdd':{
                click:function () {
                    Ext.widget('useredit');
                }
            },

            '#J_UserEdit':{
                click:this.editUser
            },

            '#J_UserDelete':{
                click:this.delUser
            },

            'userlist':{
                selectionchange:this.checkEnable
            },

            'useredit button[action=save]':{
                click:this.updateUser
            }
        });
    },
    checkEnable:function (sm) {
        var len = sm.getSelection().length;

        this.getEditButton().setDisabled(len !== 1);
        this.getDelButton().setDisabled(len == 0);

    },

    delUser:function () {

        this.application.confirm('注意', '确认要删除这些员工？', function(btnId) {
            if(btnId == 'ok') {
                var sm = this.getList().getSelectionModel();
                this.getUsersStore().remove(sm.getSelection());
                this.sync();
            }
        }, this);
    },

    updateUser:function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues(),
            record = form.getRecord(),
            store = this.getUsersStore();

        if (!form.getForm().isValid()) {
            Ext.Msg.alert('错误', '数据非法，请重新填写！');
            return;
        }
        record ? record.set(values) : store.add(values);
        win.close();
        this.sync();
    },

    editUser:function () {
        var view = Ext.widget('useredit'),
            record = this.getList().getSelectionModel().getSelection()[0];
        view.down('form').loadRecord(record);
    },

    sync: function() {
        var store = this.getUsersStore();
        store.sync({
            failure: function () {
                this.application.error('错误', '操作失败，请重试！');
                store.rejectChanges();
                var sm = this.getList().getSelectionModel();
                sm.select(sm.getSelection());
            },
            scope:this
        });
    }
});