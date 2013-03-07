Ext.define('AM.controller.NavBar', {
    extend: 'Ext.app.Controller',
    views:[
        'NavBar',
        'PwdDialog'
    ],
    init: function() {
        this.control({
           '#changePwd': {
               'click': function() {
                    Ext.widget('pwddialog');
               }
           }
        });
    }
})