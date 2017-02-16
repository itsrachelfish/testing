<?php

// Connections file is based on messages sent to opers via inspircd
// Example: 16:20 !server.name *** REMOTECONNECT: Client connecting at server.name: nick!user@host.name (xxx.xxx.xxx.xxx) [real name]
$rawConnections = file_get_contents("./logs/connections.txt");
$rawConnections = explode("\n", $rawConnections);
$connections = [];

foreach($rawConnections as $line)
{
    preg_match("/\*\*\* .*: (.*?)!.*? \(([0-9.]+)\)/", $line, $match);

    if(!empty($match))
    {
        $name = $match[1];
        $ip = $match[2];

        if(!isset($connections[$ip]))
        {
            $connections[$ip] = ['names' => [], 'count' => 0];
        }

        if(!in_array($name, $connections[$ip]['names']))
        {
            $connections[$ip]['names'][] = $name;
        }

        $connections[$ip]['count']++;
    }
}

ksort($connections);

foreach($connections as $connection => $metadata)
{
    $names = implode(', ', $metadata['names']);
    echo "IP address: {$connection} - Connections: {$metadata['count']} - Names: {$names}\n";
}

?>


