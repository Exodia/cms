Ext.define('AM.view.NavBar', {
   extend: 'Ext.panel.Panel',
   alias: 'widget.navbar',
   border: false,
//   margin: '10 0 0 0',
   html: document.getElementById('navTpl').innerHTML
});