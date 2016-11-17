<?php

include "paginate.php";
use Paginator\Paginate;

$paginator = new Paginate(20, 1, 10);

echo "\n==============================\n";
echo "Plain text version:";
echo "\n------------------------------\n";
echo $paginator->renderText();
echo "\n==============================\n";

echo "\n==============================\n";
echo "HTML output:";
echo "\n------------------------------\n";
echo $paginator->renderHTML();
echo "\n==============================\n";

?>
