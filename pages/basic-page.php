<?php
include("../partials/head.inc.php");
?>

<main class="home">
    <?include("../partials/header.inc.php");?>
    <nav class="mainnav">
        <?include("../partials/mainnav.inc.php");?>
    </nav>
    <section class="body">
        <h1><?=$page->title?></h1>
        <?=$page->body?>
    </section>
</main>

<?php
include("../partials/footer.inc.php");
include("../partials/foot.inc.php");
?>
