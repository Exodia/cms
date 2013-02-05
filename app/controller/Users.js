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

    init:function () {
        this.control({
            '#J_UserAdd': {
                click: function() {
                    Ext.widget('useredit');
                }
            },

            'userlist': {
                itemdblclick: this.editUser
            },

            'useredit button[action=save]':{
                click:this.updateUser
            }
        });
    },
    updateUser:function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues(),
            record = form.getRecord(),
            store = this.getUsersStore();

        record ? record.set(values) : store.insert(0, values);
        win.close();
        console.log(store.getNewRecords());
        store.sync({
            callback: function() {
                alert('complete')
            },
            success: function() {
                alert('success');
            },
            failure: function() {
                alert('failure');
            }
        });
    },

    editUser:function (grid, record) {
        var view = Ext.widget('useredit');
        view.down('form').loadRecord(record);
    }
});