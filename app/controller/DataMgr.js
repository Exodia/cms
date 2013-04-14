Ext.define('AM.controller.DataMgr', {
    extend:'Ext.app.Controller',
    stores:[
        'Materials'
    ],
    views: [
        'datamgr.List',
        'datamgr.Edit'
    ],
    models:['Material'],
    refs:[
        {
            ref:'list',
            selector:'data_list'
        },
        {
            ref:'editButton',
            selector:'#J_DataEdit'
        }
    ],
    init:function () {
        this.control({
            '#J_DataAdd':{
                click:function () {
                    Ext.widget('data_edit', {
                        title: '新增物料'
                    });
                }
            },

            '#J_DataEdit':{
                click:this.editData
            },

            'data_list':{
                selectionchange:this.checkEnable
            },

            'data_edit button[action=save]':{
                click:this.updateData
            }
        });
    },
    checkEnable:function (sm) {
        var len = sm.getSelection().length;
        this.getEditButton().setDisabled(len !== 1);
    },

    updateData:function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues(),
            record = form.getRecord(),
            store = this.getMaterialsStore();

        if (!form.getForm().isValid()) {
            Ext.Msg.alert('错误', '数据非法，请重新填写！');
            return;
        }
        record ? record.set(values) : store.add(values);
        win.close();
        this.application.sync(store, this);
    },

    editData:function () {
        var view = Ext.widget('data_edit'),
            form =  view.down('form');
        record = this.getList().getSelectionModel().getSelection()[0];

        form.loadRecord(record);
    }
});