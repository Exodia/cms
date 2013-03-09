Ext.define('AM.controller.Users', {
    extend:'Ext.app.Controller',
    views:[
        'UserType',
        'SaleGroup',
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
        },
        {
            ref: 'searchCombo',
            selector: 'userlist combo'
        },
        {
            ref: 'searchField',
            selector: '#J_SearchText'
        }
    ],
    init:function () {
        this.control({
            '#J_UserAdd':{
                click:function () {
                    Ext.widget('user_edit', {
                        title: '新增用户'
                    });
                }
            },

            '#J_UserEdit':{
                click:this.editUser
            },

            '#J_UserDelete':{
                click:this.delUser
            },

            '#J_UserSearch': {
                click: this.searchUser
            },

            'userlist':{
                selectionchange:this.checkEnable
            },

            'user_edit button[action=save]':{
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
        this.application.confirm('注意', '确认要删除所选信息？', function (btnId) {
            if (btnId == 'ok') {
                var sm = this.getList().getSelectionModel(),
                    store = this.getUsersStore();
                store.remove(sm.getSelection());
                this.application.sync(store, this);
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
        this.application.sync(store, this);
    },

    editUser:function () {
        var view = Ext.widget('user_edit'),
            record = this.getList().getSelectionModel().getSelection()[0];
        view.down('form').loadRecord(record);
    },

    searchUser: function() {
        var store = this.getUsersStore(),
            value = this.getSearchField().getValue();
        store.isFiltered() && store.clearFilter();

        if(!value) {
            return;
        }

        if(this.getSearchCombo().getRawValue() == '按工号') {
            store.filter('workNum', parseInt(value));
        } else {
            store.filter('name', value);
        }
    }
});