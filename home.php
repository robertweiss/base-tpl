<?php
include("./includes/structure/head.inc.php");
?>

<main class="home">
    <?include("./includes/structure/header.inc.php");?>
    <nav class="mainnav">
        <?include("./includes/structure/mainnav.inc.php");?>
    </nav>
    <section class="body">
        <?=$page->body?>
    </section>
</main>

<?php
include("./includes/structure/footer.inc.php");
include("./includes/structure/foot.inc.php");
?>
