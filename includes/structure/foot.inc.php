<?php
include('./js.inc.php');

$tplJsFile = 'assets/js/'.$page->template.'.js';
if (file_exists('./'.$tplJsFile)) echo "<script src='{$config->urls->templates}{$tplJsFile}?v={$assetsVersion}'></script>";
?>

</body>
</html>
