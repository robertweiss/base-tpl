<?php

$navOptions = array(
    'show_root' => false,
    'levels' => true,
    'max_levels' => 2
);

$mainNavOut = $navModule->render($navOptions);

$mainNavOut = '<button class="mainnav--toggle js-mainnav-toggle" aria-label="Navigation einblenden">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="15" viewBox="0 0 24 15"><path d="M24 14.5c0 .3-.2.5-.5.5H.5c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5h23c.3 0 .5.2.5.5v2zm0-8c0-.3-.2-.5-.5-.5H.5c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h23c.3 0 .5-.2.5-.5v-2zm0-6c0-.3-.2-.5-.5-.5H.5C.2 0 0 .2 0 .5v2c0 .3.2.5.5.5h23c.3 0 .5-.2.5-.5v-2z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
</button>'.$mainNavOut;
echo $mainNavOut;
?>
