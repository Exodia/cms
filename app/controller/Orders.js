/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-1-29
 * Time: 下午10:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('AM.controller.Orders', {
    extend:'Ext.app.Controller',
    views:[
        'order.List',
        'order.General',
        'order.Audit'
    ],
    stores:[
        'Orders'
    ],
    models:['Order'],

    refs:[
        {
            ref:'list',
            selector:'orderlist'
        },
        {
            ref:'editButton',
            selector:'#J_OrderEdit'
        },
        {
            ref:'delButton',
            selector:'#J_UserDelete'
        }
    ],

    init:function () {

    }
});