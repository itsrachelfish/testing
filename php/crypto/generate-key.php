<?php

require __DIR__ . '/vendor/autoload.php';

use phpseclib3\Crypt\RSA;
use phpseclib3\Crypt\RSA\Formats\Keys\PSS;

$private = RSA::createKey(4096);
$public = $private->getPublicKey();

echo $private->toString('PSS') . "\n";
echo $public->toString('PSS') . "\n";

file_put_contents("private.key", $private->toString('PSS'));
echo "Private key saved as ./private.key \n";

file_put_contents("public.key", $public->toString('PSS'));
echo "Public key saved as ./public.key \n";
