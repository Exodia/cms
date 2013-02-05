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

            '#J_UserEdit':function () {

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
    updateUser:function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues(),
            record = form.getRecord(),
            store = this.getUsersStore();

        record ? record.set(values) : store.add(values);
        win.close();
        store.sync({
            failure:function () {
                Ext.msg.alert('操作失败，请重试');
            }
        });
    },

    editUser:function (grid, record) {
        var view = Ext.widget('useredit');
        view.down('form').loadRecord(record);
    }
});