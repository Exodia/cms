/**
 * Created with JetBrains WebStorm.
 * User: exodia
 * Date: 13-1-29
 * Time: 下午10:49
 * To change this template use File | Settings | File Templates.
 */
CREATE TABLE `om_order_info` (
`id` bigint(20) NOT NULL COMMENT '内部ID',
`order_id` bigint(20) DEFAULT NULL COMMENT '订单主信息ID',
`goods_code` varchar(64) DEFAULT NULL COMMENT '物质编码',
`goods_name` varchar(256) DEFAULT NULL COMMENT '物质名称',
`goods_type` varchar(256) DEFAULT NULL COMMENT '规格型号',
`measure_unit` varchar(64) DEFAULT NULL COMMENT '计量单位',
`quantity` int(11) DEFAULT NULL COMMENT '数量',
`price` bigint(20) DEFAULT NULL COMMENT '单价',
`price_tax` bigint(20) DEFAULT NULL COMMENT '含税单价',
`deadline` datetime DEFAULT NULL COMMENT '交付日期',
`status` int(4) DEFAULT NULL COMMENT '状态变化，未审核为1，已审核通过为2，不通过为3，被覆盖为4',
`gmt_created` datetime DEFAULT NULL COMMENT '创建时间',
`gmt_modified` datetime DEFAULT NULL COMMENT '修改时间',
`contract_id` bigint(20) DEFAULT NULL COMMENT '合同号',
    PRIMARY KEY (`id`)
)
BLuE&&知足  22:10:26
