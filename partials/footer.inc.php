<?php
$imprint = $pages->get('/impressum');
?>

<footer>
    <div class="footer--inner">
        <nav class="footer--nav">
            <ul>
                <li><a href="<?=$imprint->url?>"><?=$imprint->title?></a></li>
            </ul>
        </nav>
    </div>
</footer>
