<?php
 
define('OFFSET', 268435456);
define('RADIUS', 85445659.4471);
define('PI', 3.141592653589793238462);
 
class Cluster {
 
    private function lonToX($lon) {
        return round(OFFSET + RADIUS * $lon * PI / 180);
    }
 
    private function latToY($lat) {
        return round(OFFSET - RADIUS * log((1 + sin($lat * PI / 180)) / (1 - sin($lat * PI / 180))) / 2);
    }
 
    private function pixelDistance($lat1, $lon1, $lat2, $lon2, $zoom) {
        $x1 = $this->lonToX($lon1);
        $y1 = $this->latToY($lat1);
 
        $x2 = $this->lonToX($lon2);
        $y2 = $this->latToY($lat2);
 
        return sqrt(pow(($x1 - $x2), 2) + pow(($y1 - $y2), 2)) >> (21 - $zoom);
    }
 
    private function newClusterPoint($x1, $x2, $y1, $y2, $movePercent) {
 
        $newPoint = array();
        $pixel = sqrt(pow(($x1 - $x2), 2) + pow(($y1 - $y2), 2));
 
        $cosin = ($x1 - $x2) / $pixel;
        $sinus = ($y1 - $y2) / $pixel;
        $distanceMovePixel = $pixel * $movePercent;
        $newXMove = $cosin * $distanceMovePixel;
        $newYMove = $sinus * $distanceMovePixel;
 
        $newPoint[0] = $x1 - $newXMove;
        $newPoint[1] = $y1 - $newYMove;
 
        return $newPoint;
    }
 
    /**
     * Create Clusters
     * @param $locationPoints
     * @param $distance
     * @param $zoom
     * @param $moreThen
     * @return clustered
     */
    public function createCluster($locationPoints, $distance, $zoom, $moreThen) {
 
        if ($moreThen > 0) $moreThen -= 1;
        if ($moreThen < 0) $moreThen = 0;
 
        $clustered = array();
 
        for ($i = 0; $i < count($locationPoints); ) {
 
            $marker = array_shift($locationPoints);
 
            $cluster = 0;
            $clusterFinderIndex = array();
            $movePercent = 0.5;
 
            $clusterPoint = $marker["location"];
 
            for ($j = 0; $j < count($locationPoints); $j++) {
 
                $pixel = $this->pixelDistance(
                                                $marker["location"][1],
                                                $marker["location"][0],
                                                $locationPoints[$j]["location"][1],
                                                $locationPoints[$j]["location"][0],
                                                $zoom
                                              );
 
                if ($distance > $pixel) {
                    $cluster ++;
                    $clusterFinderIndex[] = $j;
 
                    $clusterPoint = $this->newClusterPoint(
                                                            $clusterPoint[0],
                                                            $locationPoints[$j]["location"][0],
                                                            $clusterPoint[1],
                                                            $locationPoints[$j]["location"][1],
                                                            $movePercent
                                                            );
 
                    $movePercent -= ($movePercent * 0.03);
                }
            }
 
            if ($cluster > $moreThen) {
 
                for ($k = 0; $k < count($clusterFinderIndex); $k++) {
                    unset($locationPoints[$clusterFinderIndex[$k]]);
                }
 
                $clusterData = array();
 
                $clusterData["count"] = $cluster + 1;
                $clusterData["coordinate"] = $clusterPoint;
 
                $clustered[] = $clusterData;
 
            } else {
 
                $clustered[] = $marker;
 
            }
 
        }
 
        return $clustered;
 
    }
 
}