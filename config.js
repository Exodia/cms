Ext.namespace('AM');
AM.API = {
    changePwd: './data/fail.json',
    dataImport: './data/file.php',
    orderDetail: {
        read: 'data/orderdetial/read.json'
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

AM.UserType =  ['营销员', '合同管理员', '发票管理员', '发运员'];
AM.SaleGroup  =['城轨', '机车', '动车', '新产业', '销售管理'];