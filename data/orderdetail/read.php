<?php
$arr = array("success"=>true, "data"=>array(array("id"=>1,

"orderId"=>1, "materialCode"=>1, "orderCode"=>"x12", "materialName"=>"测试物料名称", "remainAmount"=>200,
 "type"=>1, "unit"=>"件", "amount"=>10, "taxPrice"=>2000, "price"=>2340, "unitPrice"=>200,
  "unitTaxPrice"=>234, "deadline"=> "2013-10-10"
), array("id"=>2,

   "orderId"=>1, "materialCode"=>1, "orderCode"=>"x12", "materialName"=>"测试物料名称", "remainAmount"=>300,
    "type"=>1, "unit"=>"件", "amount"=>10, "taxPrice"=>2000, "price"=>2340, "unitPrice"=>200,
     "unitTaxPrice"=>234, "deadline"=> "2013-10-10"
   )) );

if($_GET['history']) {
   $arr = array("success"=>true, "data"=>array(array("id"=>1,

     "orderId"=>1, "materialCode"=>1, "orderCode"=>"x12", "materialName"=>"12121212", "remainAmount"=>200,
      "type"=>1, "unit"=>"件", "amount"=>10, "taxPrice"=>2000, "price"=>2340, "unitPrice"=>200,
       "unitTaxPrice"=>234, "deadline"=> "2013-10-10"
     )) );

}

echo  json_encode($arr);
?>