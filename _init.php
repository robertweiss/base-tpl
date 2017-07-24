<?php

$siteTitle = '';
$home = $pages->get('/');

$navModule = $modules->get("MarkupSimpleNavigation");

$paginationOptions = array(
    'nextItemLabel'	=> '<svg class="icon__icon-arrow-right"><use xlink:href="#icon-arrow-right"></use></svg>',
    'previousItemLabel' => '<svg class="icon__icon-arrow-left"><use xlink:href="#icon-arrow-left"></use></svg>'
);

$addJS = array();

$assetsVersion = '0.01';

?>
