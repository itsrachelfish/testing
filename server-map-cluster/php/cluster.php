<?php

// Original version of this class found via http://rtsoftwaregroup.io/server-side-google-map-markers-clustering/
// Updated to support more accurate position averages
 
define('OFFSET', 268435456);
define('RADIUS', 85445659.4471);
define('PI', 3.141592653589793238462);
 
class Cluster
{
    private function lonToX($lon)
    {
        return round(OFFSET + RADIUS * $lon * PI / 180);
    }
 
    private function latToY($lat)
    {
        return round(OFFSET - RADIUS * log((1 + sin($lat * PI / 180)) / (1 - sin($lat * PI / 180))) / 2);
    }
 
    private function pixelDistance($lat1, $lon1, $lat2, $lon2, $zoom)
    {
        $x1 = $this->lonToX($lon1);
        $y1 = $this->latToY($lat1);
 
        $x2 = $this->lonToX($lon2);
        $y2 = $this->latToY($lat2);
 
        return sqrt(pow(($x1 - $x2), 2) + pow(($y1 - $y2), 2)) >> (21 - $zoom);
    }
 
    /**
     * Create Clusters
     * @param $locationPoints
     * @param $distance
     * @param $zoom
     * @param $moreThan
     * @return clustered
     */
    public function createCluster($locationPoints, $distance, $zoom, $moreThan)
    {
        if ($moreThan > 0) $moreThan -= 1;
        if ($moreThan < 0) $moreThan = 0;
        
        $clustered = array();
 
        for ($i = 0; $i < count($locationPoints); )
        {
            $marker = array_shift($locationPoints);
 
            $cluster = 0;
            $clusterFinderIndex = array();
 
            $clusterPoint = $marker;
            $clusterPoints = array();
 
            for ($j = 0; $j < count($locationPoints); $j++)
            {
 
                $pixel = $this->pixelDistance
                (
                    $marker['lat'],
                    $marker['lng'],
                    $locationPoints[$j]['lat'],
                    $locationPoints[$j]['lng'],
                    $zoom
                );
 
                if ($distance > $pixel)
                {
                    $cluster ++;
                    $clusterFinderIndex[] = $j; 
                    $clusterPoints[] =  $locationPoints[$j];
                }
            }

            // If the cluster count is more than the specified minimum
            if ($cluster > $moreThan)
            {
                for ($k = 0; $k < count($clusterFinderIndex); $k++)
                {
                    unset($locationPoints[$clusterFinderIndex[$k]]);
                }
 
                $clusterData = array();
 
                $clusterData['count'] = $cluster + 1;
                $clusterData['position'] = $clusterPoint;
                $clusterData['points'] = $clusterPoints;
 
                $clustered[] = $clusterData;
            }
            else
            {
                $clustered[] = $marker; 
            }
        }

        // Loop through cluster points to determine average position
        foreach($clustered as $index => $cluster)
        {
            $total = array('lat' => 0, 'lng' => 0);
            
            foreach($cluster['points'] as $point)
            {
                $total['lat'] += $point['lat'];
                $total['lng'] += $point['lng'];
            }

            $total['lat'] /= count($cluster['points']);
            $total['lng'] /= count($cluster['points']);


            $clustered[$index]['position'] = array('lat' => $total['lat'], 'lng' => $total['lng']);
            unset($clustered[$index]['points']);
        }

        return $clustered;
    }
}
