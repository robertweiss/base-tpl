<?php
include('./js.inc.php');

$tplJsFile = 'js/'.$page->template.'.js';
if (file_exists('./'.$tplJsFile)) echo "<script src='{$config->urls->dist}{$tplJsFile}?v={$assetsVersion}'></script>";
?>

</body>
</html>
