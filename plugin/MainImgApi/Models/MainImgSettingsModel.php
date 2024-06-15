<?php

namespace Plugin\MainImgApi\Models;

use CodeIgniter\Model;

class MainImgSettingsModel extends Model
{
    protected $table = 'main_img_settings';
    protected $primaryKey = 'id';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $useTimestamps = true;
    protected $allowedFields = ['shopify_auth_id', 'stop', 'speed', 'method', 'arrow', 'dots'];
}
