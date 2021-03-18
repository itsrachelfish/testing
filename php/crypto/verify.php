<?php

require __DIR__ . '/vendor/autoload.php';

use phpseclib3\Crypt\PublicKeyLoader;

$public = PublicKeyLoader::load(file_get_contents('./public.key'));
$signedMessage = file_get_contents('./message.txt');

list($message, $signature) = explode(':', $signedMessage);
$message = base64_decode($message);
$signature = base64_decode($signature);

echo "Loaded message '{$message}' \n";

if($public->verify($message, $signature)) {
  echo "Message signature is valid. \n";
} else {
  echo "⚠️  WARNING!⚠️  Message signature is invalid! \n";
}
