<?php

$file = file_get_contents("attack-ips.txt");
$lines = explode("\n", $file);
$ips = [];

foreach($lines as $line)
{
    if(empty($line)) {
        continue;
    }

    if(!isset($ips[$line])) {
      $ips[$line] = 0;
    }

    $ips[$line]++;
}

asort($ips);
print_r($ips);

foreach($ips as $ip => $count)
{
    if($count >= 10) {
        echo "iptables -I INPUT -s {$ip} -j DROP\n";
    }
}

?>
