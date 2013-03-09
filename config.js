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
    user: {
        create: 'data/user/create.php',
        read: 'data/user/read.json',
        update: 'data/user/updateUsers.json',
        destroy: 'data/user/destroyUsers.json'
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
    successProperty: 'success'
};
