<?php

namespace Plugin\MainImgApi\Controllers;

use CodeIgniter\API\ResponseTrait;
use Plugin\ShopifyAuth\Controllers\Api\ApiBaseController;
use Plugin\MainImgApi\Models\MainImgSettingsModel;
use Config\Database;

class MainImgSettings extends ApiBaseController
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
            //return $this->fail(["error" => "指定された設定は存在しません。"], 404);
            return $this->respond([
                "data" => []
            ]);
        }

        return $this->respond([
            "data" => $data
        ]);
    }

    public function save()
    {
        
        $jsonData = $this->request->getJSON(true);

        if (is_null($jsonData) || !is_array($jsonData)) {
            return $this->failValidationErrors(['error' => '無効なJSONデータ']);
        }

        if (!$this->validateData($jsonData, config("MainImgSettingValidation")->getDefaultRule($this->getShopifySDK()))) {
            return $this->failValidationErrors($this->validator->getErrors());
        }


        $data = $this->MainImgSettings->where([
            'shopify_auth_id' => $this->getShopId()
        ])->first();

        $db = Database::connect();
        $db->transStart();

        try {
            $jsonData["id"] = !empty($data["id"]) ? $data["id"] : null;
            $jsonData["shopify_auth_id"] = $this->getShopId();

            $result = $this->MainImgSettings->save($jsonData);

            if ($result === false) {
                throw new \Exception($db->error()["message"]);
            }

            $db->transCommit();
        } catch (\Exception $e) {
            $db->transRollback();
            return $this->failServerError('サーバーエラー：' . $e->getMessage());
        }

        return $this->respondCreated([
            "id" => $result,
            'message' => '設定の更新に成功しました'
        ]);
    }
}
