Ext.define('AM.controller.Transports', {
    extend:'Ext.app.Controller',
    views:[
        'transport.List',
        'transport.Edit'
    ],
    stores:[
        'Transports'
    ],
    models:['Transport'],
    refs:[
        {
            ref:'list',
            selector:'transportlist'
        },
        {
            ref:'editButton',
            selector:'#J_TransportEdit'
        },
        {
            ref:'delButton',
            selector:'#J_TransportDelete'
        }
    ],
    init:function () {
        this.control({
            '#J_TransportAdd':{
                click:function () {
                    Ext.widget('transportedit', {
                        title: '新增物流信息'
                    });
                }
            },

            '#J_TransportEdit':{
                click:this.editTransport
            },

            '#J_TransportDelete':{
                click:this.delTransport
            },

            'transportlist':{
                selectionchange:this.checkEnable
            },

            'transportedit button[action=save]':{
                click:this.updateTransport
            }
        });
    },
    checkEnable:function (sm) {
        var len = sm.getSelection().length;
        this.getEditButton().setDisabled(len !== 1);
        this.getDelButton().setDisabled(len == 0);
    },

    delTransport:function () {
        this.application.confirm('注意', '确认要删除所选信息？', function (btnId) {
            if (btnId == 'ok') {
                var sm = this.getList().getSelectionModel(),
                    store = this.getTransportsStore();
                store.remove(sm.getSelection());
                this.application.sync(store, this);
            }
        }, this);
    },

    updateTransport:function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues(),
            record = form.getRecord(),
            store = this.getTransportsStore();

        if (!form.getForm().isValid()) {
            Ext.Msg.alert('错误', '数据非法，请重新填写！');
            return;
        }
        record ? record.set(values) : store.add(values);
        win.close();
        this.application.sync(store, this);
    },

    editTransport:function () {
        var view = Ext.widget('transportedit'),
            record = this.getList().getSelectionModel().getSelection()[0];
        view.down('form').loadRecord(record);
    }
});