<?php

$filters->aliases['rateLimitFilter'] =  \Plugin\ShopifyAuth\Filters\RateLimitFilter::class;
$filters->filters["rateLimitFilter"] = [
    "before" => '/api/*'
];

$filters->aliases['shopifyAuthFilter'] =  \Plugin\ShopifyAuth\Filters\ShopifyAuthFilter::class;
$filters->filters["shopifyAuthFilter"] = [
    "before" => '/api/*'
];


$filters->aliases['shopifyFrontAuthFilter'] =  \Plugin\ShopifyAuth\Filters\ShopifyFrontAuthFilter::class;
$filters->filters["shopifyFrontAuthFilter"] = [
    "before" => '/front_api/*'
];