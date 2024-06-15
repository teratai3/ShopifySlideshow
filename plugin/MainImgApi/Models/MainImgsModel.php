<?php

namespace Plugin\MainImgApi\Models;

use CodeIgniter\Model;

class MainImgsModel extends Model
{
    protected $table = 'main_imgs';
    protected $primaryKey = 'id';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $useTimestamps = true;

    protected $allowedFields = ['shopify_auth_id', 'url', 'pc_img', 'sp_img', 'alt', 'link_flag', 'sort_no'];
    protected $afterFind = ['addFullUrls'];

    protected function addFullUrls(array $data)
    {
        $imageFields = ['pc_img', 'sp_img'];

        if (isset($data['data'])) {
            if (isset($data['data'][0])) {
                // findAll時
                foreach ($data['data'] as &$record) {
                    foreach ($imageFields as $field) {
                        $record[$field] = $record[$field] ? base_url("assets/uploads/" . $record[$field]) : null;
                    }
                }
            } else {
                foreach ($imageFields as $field) {
                    $data['data'][$field] = $data['data'][$field] ? base_url("assets/uploads/" . $data['data'][$field]) : null;
                }
            }
        }

        return $data;
    }
}
