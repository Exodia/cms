Ext.define('AM.view.order.SearchPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.search_panel',
    border:false,
    style: {
      borderRadius: 'none'
    },
    collapsible: true,
    collapsed: true,
    collapseDirection: 'right',
    title: '查询订单',
    frame: true,
    width: 200,
    dock: 'left'
});