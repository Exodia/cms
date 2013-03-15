Ext.namespace('AM');
AM.API = {
    changePwd: './data/fail.json',
    dataImport: './data/file.php',
    orderDetail: {
        read: 'data/orderdetail/read.php'
    },
    historyDetail: {
        read: 'data/orderdetail/read.php'
    },

    contractDetial: {
        read: 'data/orderdetail/read.json'
    },
    order: {
        create: 'data/success.json',
        read: 'data/order/read.json',
        update: 'data/fail.json',
        destroy: 'data/success.json'
    },
    auditOrder: {
        create: 'data/success.json',
        read: 'data/order/read.json',
        update: 'data/fail.json',
        destroy: 'data/success.json'
    },
    user: {
        create: 'data/user/create.php',
        read: 'data/user/read.json',
        update: 'data/user/updateUsers.json',
        destroy: 'data/user/destroyUsers.json'
    },
    custom: {
        create: 'data/success.json',
        read: 'data/custom/read.json',
        update: 'data/success.json',
        destroy: 'data/success.json'

    },
    company: {
        create: 'data/success.json',
        read: 'data/custom/read.json',
        update: 'data/success.json',
        destroy: 'data/success.json'
    },
    material:  {
        create: 'data/material/create.json',
        read: 'data/material/read.json',
        update: 'data/material/update.json',
        destroy: 'data/material/destroy.json'
    },
    contract: {
        create: 'data/contract/create.json',
        read: 'data/contract/read.json',
        update: 'data/contract/update.json',
        destroy: 'data/contract/destroy.json'
    }
};

AM.Writer = {
    type: 'json',
    root: 'data',
    successProperty: 'success',
    encode: true
};

AM.Reader = {
    type: 'json',
    root: 'data',

    successProperty: 'success',
    totalProperty: 'total'
};

AM.UserType = ['营销员', '合同管理员', '发票管理员', '发运员'];
AM.SaleGroup = ['城轨', '机车', '动车', '新产业', '销售管理'];
AM.OrderStatus = [
    '<font color="#1e90ff">待审核</font>',
    '<font color="green">审核通过</font>',
    '<font color="red">审核未通过</font>',
    '取消',
    '已绑定'
];


AM.error = function (title, msg, fn, scope) {
    Ext.Msg.show({
        title: title,
        msg: msg,
        fn: fn,
        scope: scope,
        buttons: Ext.MessageBox.OK,
        buttonText: {
            ok: '确定'
        },
        icon: Ext.MessageBox.ERROR
    });
};

AM.createProxy = function(apiType) {
    return {
        type: 'ajax',
        api: AM.API[apiType],
        listeners: AM.ProxyListeners,
        reader: AM.Reader,
        writer: AM.Writer
    }
};

AM.ProxyListeners = {
    exception: function(proxy, res) {
        var msg = '';
        if(res.responseText) {
            msg = Ext.JSON.decode(res.responseText).msg;
        }
        AM.error('操作失败', msg);
    }
};