Ext.define('AM.view.transport.List', {
    extend:'Ext.grid.Panel',
    alias:'widget.transport_list',
    store:'Transports',
    columns: [
        {
            header: '订单号',
            flex: 1,
            dataIndex: 'orderCode'
        },
        {
            header: '发运号',
            flex: 1,
            dataIndex: 'transportCode'
        },
        {
            header: '发运信息',
            flex: 3,
            dataIndex: 'info'
        },
        {
            header: '发货数量',
            width: 70,
            dataIndex: 'transportAmount'
        },
        {
            header: '包装箱种类',
            width: 80,

            dataIndex: 'boxType'
        },
        {
            header: '包装箱数量',
            width: 70,
            dataIndex: 'boxAmount'
        },

        {
            header: '时间',
            width: 110,
            dataIndex: 'date',
            renderer: function(v) {
                if (!v) {
                    return '';
                }
                return Ext.Date.format(new Date(v), 'Y年m月d日');
            }
        },
        {
            header: '状态',
            width: 50,
            dataIndex: 'status',
            renderer: function(v) {
               return AM.TransportStatus[v];
            }
        }
    ]
});