Ext.define('AM.view.NavBar', {
    extend: 'Ext.panel.Panel',
    requires: ['AM.widget.PwdDialog'],
    alias: 'widget.navbar',
    border: false,
    html: document.getElementById('navTpl').innerHTML.replace(/{.*}/, LoginUser.name)
});