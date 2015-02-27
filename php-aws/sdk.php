<?php

require 'vendor/autoload.php';

use Aws\S3\S3Client;

// Instantiate an S3 client
$s3 = S3Client::factory(array
(
    'profile' => 'default'
));

$result = $s3->listBuckets();

foreach ($result['Buckets'] as $bucket) {
    // Each Bucket value will contain a Name and CreationDate
    echo "{$bucket['Name']} - {$bucket['CreationDate']}\n";
}

?>