<?php

namespace Plugin\MainImgApi\Config;

use PHPShopify\ShopifySDK;
use Plugin\MainImgApi\Models\MainImgsModel;
use Config\Services;

class MainImgValidation
{
    protected $default = [
        'url' => ['label' => 'リンク先URL', 'rules' => ["permit_empty", "max_length[250]", "valid_url_strict"]],
        'pc_img' => [
            'label' => 'PC画像',
            'rules' => [
                "uploaded[pc_img]",
                "max_size[pc_img,1024]",
                "ext_in[pc_img,jpg,jpeg,png,gif]",
                "is_image[pc_img]",
                "mime_in[pc_img,image/jpg,image/jpeg,image/gif,image/png]",
                "max_dims[pc_img,1900,1900]"
            ]
        ],
        'sp_img' => [
            'label' => 'SP画像',
            'rules' => [
                "uploaded[sp_img]",
                "max_size[sp_img,1024]",
                "ext_in[sp_img,jpg,jpeg,png,gif]",
                "is_image[sp_img]",
                "mime_in[sp_img,image/jpg,image/jpeg,image/gif,image/png]",
                "max_dims[sp_img,1900,1900]"
            ]
        ],
        'alt' => ['label' => 'alt', 'rules' => ["permit_empty", "max_length[250]"]],
        'link_flag' => ['label' => 'リンク表示', 'rules' => ["permit_empty", "required_with[url]", "in_list[0,1]"]],
        'sort_no' => ['label' => '並び順', 'rules' => ["permit_empty", "numeric"]],
    ];

    public function getDefaultRule(ShopifySDK $shopifySDK, $id = false)
    {
        $rule = $this->default;
        $request = Services::request();

        if (!$request->getFile('sp_img')) {
            unset($rule['sp_img']);
        }

        if ($id) {
            // POSTデータの文字列をブール値に変換
            $pc_img_delete = filter_var($request->getPost('pc_img_delete'), FILTER_VALIDATE_BOOLEAN);
            // $sp_img_delete = filter_var($request->getPost('sp_img_delete'), FILTER_VALIDATE_BOOLEAN);
            //log_message("error",$pc_img_delete);
            if (!$request->getFile('pc_img') && $pc_img_delete === false) {
                unset($rule['pc_img']);
            }
        }



        return $rule;
    }
}
