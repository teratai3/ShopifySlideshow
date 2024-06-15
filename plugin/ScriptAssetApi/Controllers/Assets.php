<?php

namespace Plugin\ScriptAssetApi\Controllers;

use CodeIgniter\API\ResponseTrait;
use Plugin\ShopifyAuth\Controllers\Api\ApiBaseController;


class Assets extends ApiBaseController
{
    use ResponseTrait;

    public function main_img()
    {
        return $this->respond([
            "data" => view('Plugin\ScriptAssetApi\Views\Assets\main_img'),
        ]);
    }
}
