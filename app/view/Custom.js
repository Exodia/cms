Ext.define('AM.view.Custom', {
    extend: 'Ext.form.field.Trigger',
    requires: ['AM.view.CustomWindow'],
    alias:'widget.custom',
    editable: false,
    onTriggerClick: function() {
        Ext.Msg.alert('Status', 'You clicked my trigger!');
    }
//    store: 'Customs'
});