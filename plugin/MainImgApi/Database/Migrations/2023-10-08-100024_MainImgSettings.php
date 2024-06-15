<?php

namespace Plugin\MainImgApi\Database\Migrations;

use CodeIgniter\Database\Migration;

class MainImgSettings extends Migration
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
                'unique' => true,
            ],
            'stop' => [
                'type' => 'INT',
                'null' => false,
                'unsigned' => true,
            ],
            'speed' => [
                'type' => 'INT',
                'null' => false,
                'unsigned' => true,
            ],
            'method' => [
                'type' => 'BOOLEAN',
                'default' => false,
            ],
            'arrow' => [
                'type' => 'BOOLEAN',
                'default' => false,
            ],
            'dots' => [
                'type' => 'BOOLEAN',
                'default' => false,
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
        $this->forge->createTable('main_img_settings');
    }

    public function down()
    {
        $this->forge->dropTable('main_img_settings');
    }
}
