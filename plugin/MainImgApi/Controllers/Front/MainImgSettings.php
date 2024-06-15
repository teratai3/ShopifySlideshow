<?php

namespace Plugin\MainImgApi\Controllers\Front;

use CodeIgniter\API\ResponseTrait;
use Plugin\ShopifyAuth\Controllers\Api\ApiFrontBaseController;
use Plugin\MainImgApi\Models\MainImgSettingsModel;
use Config\Database;

class MainImgSettings extends ApiFrontBaseController
{
    use ResponseTrait;

    protected $MainImgSettings;

    public function __construct()
    {
        parent::__construct();
        $this->MainImgSettings = new MainImgSettingsModel();
    }

    public function index()
    {
        $data = $this->MainImgSettings->where([
            'shopify_auth_id' => $this->getShopId()
        ])->first();

        if (empty($data)) {
            // return $this->fail(["error" => "指定された設定は存在しません。"], 404);
            return $this->respond([
                "data" => []
            ]);
        }

        return $this->respond([
            "data" => $data
        ]);
    }
}
