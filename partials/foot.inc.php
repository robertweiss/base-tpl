<?php
// Make array from files in js.inc.php and check if they match the current template
// Always load main.bundle.js
$jsRefs = array_filter(explode(PHP_EOL, file_get_contents($config->paths->site.'templates/partials/js.inc.php')));
foreach ($jsRefs as $jsRef) {
    if (strpos($jsRef, '/'.$page->template.'.bundle.js') !== false) echo trim($jsRef);
    if (strpos($jsRef, '/main.bundle.js') !== false) echo trim($jsRef);
}
?>

</body>
</html>
