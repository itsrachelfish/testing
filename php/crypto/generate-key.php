<?php

require __DIR__ . '/vendor/autoload.php';

use phpseclib3\Crypt\RSA;

$private = RSA::createKey(4096);
$public = $private->getPublicKey();

echo $private . "\n";
echo $public . "\n";
