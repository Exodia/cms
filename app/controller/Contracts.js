Ext.define('AM.controller.Contracts', {
    extend: 'Ext.app.Controller',
    views: [
        'contract.List'
    ],
    stores: [
        'Contracts'
    ],
    models: ['Contract'],

   /* refs: [

    ],*/

    checkEnable: function (sm) {
        var len = sm.getSelection().length;
        this.getEditButton().setDisabled(len !== 1);
        this.getViewButton().setDisabled(len !== 1);
    },

    searchOrder: function(btn) {
        var values = this.getSearchPanel().getValues();
        this.getStore('Orders').load({
            params: values
        })

    },
    init: function () {
//        this.control();
    }
});