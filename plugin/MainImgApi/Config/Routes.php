<?php
$routes->group('api/main_imgs', ['namespace' => 'Plugin\MainImgApi\Controllers'], function ($routes) {
    $routes->get('/', 'MainImgs::index');
    $routes->get('show/(:num)', 'MainImgs::show/$1');
    $routes->post('create', 'MainImgs::create');
    $routes->post('update/(:num)', 'MainImgs::update/$1');
    $routes->delete('delete/(:num)', 'MainImgs::delete/$1');
});

$routes->group('api/main_img_setting', ['namespace' => 'Plugin\MainImgApi\Controllers'], function ($routes) {
    $routes->get('/', 'MainImgSettings::index');
    $routes->post('save', 'MainImgSettings::save');
});

$routes->group('front_api/main_imgs', ['namespace' => 'Plugin\MainImgApi\Controllers\Front'], function ($routes) {
    $routes->get('/', 'MainImgs::index');
});

$routes->group('front_api/main_img_setting', ['namespace' => 'Plugin\MainImgApi\Controllers\Front'], function ($routes) {
    $routes->get('/', 'MainImgSettings::index');
});