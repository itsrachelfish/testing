<?php

require __DIR__ . '/vendor/autoload.php';

use phpseclib3\Crypt\RSA;

$private = RSA::loadFormat('PSS', file_get_contents('./private.key'));
echo "Private key loaded. Enter a message to sign: \n";

$message = rtrim(fgets(STDIN));
$signature = $private->sign($message);

$signedMessage = base64_encode($message) . ":" . base64_encode($signature);
echo $signedMessage . "\n";

file_put_contents("message.txt", $signedMessage);
echo "Signed message saved as ./message.txt \n";
