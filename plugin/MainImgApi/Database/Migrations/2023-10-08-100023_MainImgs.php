<?php

namespace Plugin\MainImgApi\Database\Migrations;

use CodeIgniter\Database\Migration;

class MainImgs extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
                'auto_increment' => true
            ],
            'shopify_auth_id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
            ],
            'url' => [
                'type' => 'VARCHAR',
                'constraint' => 500,
                'null' => true,
                'default' => null
            ],
            'pc_img' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false,
            ],
            'sp_img' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
                'default' => null
            ],
            'alt' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
                'default' => null
            ],
            'link_flag' => [
                'type' => 'BOOLEAN',
                'null' => true,
                'default' => null,
            ],
            'sort_no' => [
                'type' => 'INT',
                'null' => true,
                'default' => null
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ]
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('shopify_auth_id', 'shopify_auth', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('main_imgs');
    }

    public function down()
    {
        $this->forge->dropTable('main_imgs');
    }
}
