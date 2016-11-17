<?php

require("cluster.php");
$data = file_get_contents("../data.js");
$data = str_replace("module.exports = ", "", $data);
$locations = json_decode($data, true);
$points = array();

// Convert saved markers to clusters
foreach($locations as $location)
{
    $points[] = $location;
}

$cluster = new Cluster;
$clusters = $cluster->createCluster($points, 100, 7, 1);

echo "<pre>";
print_r(json_encode($clusters));

?>
