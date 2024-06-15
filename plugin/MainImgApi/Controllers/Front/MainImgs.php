<?php

namespace Plugin\MainImgApi\Controllers\Front;

use CodeIgniter\API\ResponseTrait;
use Plugin\ShopifyAuth\Controllers\Api\ApiFrontBaseController;
use Plugin\MainImgApi\Models\MainImgsModel;
use Config\Database;

class MainImgs extends ApiFrontBaseController
{
    use ResponseTrait;

    protected $MainImgs;

    public function __construct()
    {
        parent::__construct();
        $this->MainImgs = new MainImgsModel();
    }

    public function index()
    {
        // クエリを初期化
        $query = $this->MainImgs->orderBy("sort_no", "ASC");
        $query->where('shopify_auth_id', $this->getShopId());
        $totalItems = $this->MainImgs->countAllResults(false);
        $datas = $query->findAll();

        return $this->respond([
            "data" => $datas,
            "meta" => [
                "totalItems" => $totalItems,
            ],
        ]);
    }
}
