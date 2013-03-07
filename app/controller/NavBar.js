Ext.define('AM.controller.NavBar', {
    extend: 'Ext.app.Controller',
    views: [
        'NavBar'
    ],
    init: function () {
        this.control({
            'navbar': {
                'render': function () {
                    Ext.get('changePwd').on('click', function () {
                        Ext.widget('pwddialog');
                    });
                }
            }
        });
    }
})