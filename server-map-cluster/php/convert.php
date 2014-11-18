<?php

require("cluster.php");
$data = file_get_contents("../data.js");
$data = str_replace("module.exports = ", "", $data);
$locations = json_decode($data, true);
$points = array();

// Convert saved markers to clusters
foreach($locations as $location)
{
    $points[] = array("location" => array($location['lng'], $location['lat']));
}

$cluster = new Cluster;
$clusters = $cluster->createCluster($points, 4000, 11, 0);
 
echo "<pre>";
print_r(json_encode($clusters));

?>