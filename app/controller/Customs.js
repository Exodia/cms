Ext.define('AM.controller.Customs', {
    extend:'Ext.app.Controller',
    views:[
        'custom.Edit',
        'custom.List'
    ],
    stores:[
        'Customs'
    ],
    models:['Custom'],
    refs:[
        {
            ref:'list',
            selector:'custom_list'
        },
        {
            ref:'editButton',
            selector:'#J_CustomEdit'
        },
        {
            ref:'delButton',
            selector:'#J_CustomDelete'
        },
        {
            ref: 'searchCombo',
            selector: 'custom_list combo'
        },
        {
            ref: 'searchField',
            selector: '#J_CustomSearchText'
        }
    ],
    init:function () {
        this.control({
            '#J_CustomAdd':{
                click:function () {
                    Ext.widget('custom_edit', {
                        title: '新增客户'
                    });
                }
            },

            '#J_CustomEdit':{
                click:this.editCustom
            },

            '#J_CustomDelete':{
                click:this.delCustom
            },

            '#J_CustomSearch': {
                click: this.searchCustom
            },

            'custom_list':{
                selectionchange:this.checkEnable
            },

            'custom_edit button[action=save]':{
                click:this.updateCustom
            }
        });
    },
    checkEnable:function (sm) {
        var len = sm.getSelection().length;
        this.getEditButton().setDisabled(len !== 1);
        this.getDelButton().setDisabled(len == 0);
    },

    delCustom:function () {
        this.application.confirm('注意', '确认要删除所选信息？', function (btnId) {
            if (btnId == 'ok') {
                var sm = this.getList().getSelectionModel(),
                    store = this.getCustomsStore();
                store.remove(sm.getSelection());
                this.application.sync(store, this);
            }
        }, this);
    },

    updateCustom:function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues(),
            record = form.getRecord(),
            store = this.getCustomsStore();

        if (!form.getForm().isValid()) {
            Ext.Msg.alert('错误', '数据非法，请重新填写！');
            return;
        }
        record ? record.set(values) : store.add(values);
        win.close();
        this.application.sync(store, this);
    },

    editCustom:function () {
        var view = Ext.widget('custom_edit'),
            form =  view.down('form');
        record = this.getList().getSelectionModel().getSelection()[0];

        form.loadRecord(record);
    },

    searchCustom: function() {
        var store = this.getCustomsStore(),
            value = this.getSearchField().getValue();
        store.isFiltered() && store.clearFilter();

        if(!value) {
            return;
        }

        store.load({
           params: {
               companyName: value
           }
        });
    }
});