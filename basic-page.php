<?php
include("./includes/structure/head.inc.php");
?>

<main class="basicpage">
    <?include("./includes/structure/header.inc.php");?>
    <nav class="mainnav">
        <?include("./includes/structure/mainnav.inc.php");?>
    </nav>
    <section class="body">
        <h1><?=$page->title?></h1>
        <?=$page->body?>
    </section>
</main>

<?php
include("./includes/structure/footer.inc.php");
include("./includes/structure/foot.inc.php");
?>
