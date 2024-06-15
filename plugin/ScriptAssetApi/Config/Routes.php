<?php

$routes->group('/', ['namespace' => 'Plugin\ScriptAssetApi\Controllers'], function ($routes) {
    $routes->get('script_asset/(:segment)/(:any)', 'AssetController::fetchAsset/$1/$2');
});

$routes->group('api/assets', ['namespace' => 'Plugin\ScriptAssetApi\Controllers'], function ($routes) {
    $routes->get('main_img', 'Assets::main_img');
});