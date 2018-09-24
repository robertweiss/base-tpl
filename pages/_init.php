<?php

$siteTitle = '';
$home = $pages->get('/');
$config->urls->dist = $config->urls->site.'templates/dist';

$navModule = $modules->get("MarkupSimpleNavigation");

$iconPath = $config->urls->dist.'/svg/sprites.svg';

$paginationOptions = array(
    'nextItemLabel'	=> "<svg class='icon-arrow-right'><use xlink:href='{$iconPath}#icon-arrow-right'></use></svg>",
    'previousItemLabel' => "<svg class='icon-arrow-left'><use xlink:href='{$iconPath}#icon-arrow-left'></use></svg>"
);

$addJS = array();

$assetsVersion = '0.01';

?>
