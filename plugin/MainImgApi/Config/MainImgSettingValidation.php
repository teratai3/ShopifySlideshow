<?php

namespace Plugin\MainImgApi\Config;

use PHPShopify\ShopifySDK;

class MainImgSettingValidation
{
    protected $default = [
        'stop' => ['label' => '停止時間(ミリ秒)', 'rules' => ["required", "numeric","greater_than[0]"]],
        'speed' => ['label' => 'スライドの速さ(ミリ秒)', 'rules' => ["required", "numeric","greater_than[0]"]],
        'method' => ['label' => 'スライド方法', 'rules' => ["required", "numeric","in_list[0,1]"]],
        'arrow' => ['label' => '矢印表示', 'rules' => ["required", "numeric","in_list[0,1]"]],
        'dots' => ['label' => 'ドット表示', 'rules' => ["required", "numeric","in_list[0,1]"]],
    ];

    public function getDefaultRule(ShopifySDK $shopifySDK)
    {
        $rule = $this->default;
        return $rule;
    }
}
