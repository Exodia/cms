Ext.define('AM.view.Custom', {
    extend: 'Ext.form.field.Trigger',
    requires: ['AM.view.CustomWindow'],
    alias:'widget.custom',
    name:'customName',
    editable: false,
    fieldLabel:'订货客户',
    onTriggerClick: function() {
        Ext.Msg.alert('Status', 'You clicked my trigger!');
    }
//    store: 'Customs'
});