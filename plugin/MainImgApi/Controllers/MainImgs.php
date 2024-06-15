<?php

namespace Plugin\MainImgApi\Controllers;

use CodeIgniter\API\ResponseTrait;
use Plugin\ShopifyAuth\Controllers\Api\ApiBaseController;
use Plugin\MainImgApi\Models\MainImgsModel;
use Config\Database;
use Plugin\MainImgApi\Libraries\Uploader;

class MainImgs extends ApiBaseController
{
    use ResponseTrait;

    protected $MainImgs;
    protected $Uploader;

    public function __construct()
    {
        parent::__construct();
        $this->MainImgs = new MainImgsModel();
        $this->Uploader = new Uploader();
    }

    public function index()
    {
        $page = $this->request->getVar('page') ?? 1;
        $perPage = $this->request->getVar('perPage') ?? 10;
        $url = $this->request->getVar('url') ?? "";

        // クエリを初期化
        $query = $this->MainImgs->orderBy("sort_no", "ASC");


        $query->where('shopify_auth_id', $this->getShopId());

        if (!empty($url)) {
            $query->like('url', $url);
        }


        $totalItems = $this->MainImgs->countAllResults(false);
        $totalPages = ceil($totalItems / $perPage);

        $datas = $query->paginate($perPage, '', $page);

        return $this->respond([
            "data" => $datas,
            "meta" => [
                "currentPage" => $page,
                "perPage" => $perPage,
                "totalItems" => $totalItems,
                "totalPages" => $totalPages,
                "hasNextPage" => $page < $totalPages,
                "hasPreviousPage" => $page > 1,
            ],
        ]);
    }

    public function show($id = 0)
    {
        $data = $this->MainImgs->where([
            "id" => $id,
            'shopify_auth_id' => $this->getShopId()
        ])->first();

        if (empty($data)) {
            return $this->fail(["error" => "指定された画像は存在しません。"], 404);
        }

        return $this->respond([
            "data" => $data
        ]);
    }

    public function create()
    {

        $jsonData = $this->request->getPost();

        if (!$this->validateData($jsonData, config("MainImgValidation")->getDefaultRule($this->getShopifySDK()))) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $db = Database::connect();
        $db->transStart();

        try {
            $jsonData["shopify_auth_id"] = $this->getShopId();

            $img_dir = 'main_img/' . md5($this->getShopDomain());

            $jsonData['pc_img'] = $this->Uploader->uploadFile($this->request->getFile('pc_img'), $img_dir);

            if (!empty($this->request->getFile('sp_img'))) {
                $jsonData['sp_img'] = $this->Uploader->uploadFile($this->request->getFile('sp_img'), $img_dir);
            }

            $result = $this->MainImgs->insert($jsonData);

            if ($result === false) {
                throw new \Exception($db->error()["message"]);
            }

            $db->transCommit();
        } catch (\Exception $e) {
            $db->transRollback();
            // log_message('error', 'サーバーエラー：' . $e->getMessage());
            return $this->failServerError('サーバーエラー：' . $e->getMessage());
        }

        return $this->respondCreated([
            "id" => $result,
            'message' => '画像の追加に成功しました。'
        ]);
    }

    public function update($id = 0)
    {
        $jsonData = $this->request->getPost();

        $data = $this->MainImgs->where([
            "id" => $id,
            'shopify_auth_id' => $this->getShopId()
        ])->first();

        if (empty($data)) {
            return $this->fail(["error" => "指定された画像は存在しません。"], 404);
        }


        if (!$this->validateData($jsonData, config("MainImgValidation")->getDefaultRule(
            $this->getShopifySDK(),
            $id
        ))) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $db = Database::connect();
        $db->transStart();

        try {
            $jsonData["shopify_auth_id"] = $this->getShopId();

            $pc_img_delete = filter_var($this->request->getPost("pc_img_delete"), FILTER_VALIDATE_BOOLEAN);
            $sp_img_delete = filter_var($this->request->getPost("sp_img_delete"), FILTER_VALIDATE_BOOLEAN);

            $img_dir = 'main_img/' . md5($this->getShopDomain());

            if (!empty($this->request->getFile('pc_img'))) {
                $jsonData['pc_img'] = $this->Uploader->uploadFile($this->request->getFile('pc_img'), $img_dir);
            } else {
                unset($jsonData['pc_img']);
            }


            if (!empty($this->request->getFile('sp_img'))) {
                $jsonData['sp_img'] = $this->Uploader->uploadFile($this->request->getFile('sp_img'), $img_dir);
            } elseif ($sp_img_delete === true) {
                $jsonData['sp_img'] = NULL;
            } else {
                unset($jsonData['sp_img']);
            }

            $result = $this->MainImgs->update($id, $jsonData);

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
            'message' => '画像の更新に成功しました。'
        ]);
    }

    public function delete($id = 0)
    {
        $data = $this->MainImgs->where([
            "id" => $id,
            'shopify_auth_id' => $this->getShopId()
        ])->first();

        if (empty($data)) {
            return $this->fail(["error" => "指定された画像は存在しません。"], 404);
        }

        $db = \Config\Database::connect();
        $db->transStart();

        try {
            $result = $this->MainImgs->delete($id);

            if ($result === false) {
                throw new \Exception($db->error()["message"]);
            }

            $db->transCommit();
        } catch (\Exception $e) {
            $db->transRollback();
            return $this->failServerError('サーバーエラー：' . $e->getMessage());
        }

        return $this->respondDeleted([
            "id" => $id,
            'message' => '削除に成功しました。'
        ]);
    }
}
