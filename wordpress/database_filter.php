<?php

// This script filters database exports for wordpress
// It removes all comments, useful when dealing with neglected sites that have a ton of spam

$search =
[
    "input:",
    "output:",
    "prefix::"
];

// Search command line arguments for the following options
$options = getopt(false, $search);

if(!isset($options['input']) || !isset($options['output']))
{
    echo "\n";
    echo "Error: You must specify input and output files.\n";
    echo "Example: database_filter.php --input wordpress.sql --output wordpress-filtered.sql\n";
    echo "\n";

    exit;
}

if(!isset($options['prefix']))
{
    $options['prefix'] = "wp_";
}

$handle = fopen($options['input'], "r");

if($handle)
{
    while(($line = fgets($handle)) !== false)
    {
        // Skip junk data
        if(strpos($line, "INSERT INTO `{$options['prefix']}commentmeta`") !== false)
            continue;

        if(strpos($line, "INSERT INTO `{$options['prefix']}comments`") !== false)
            continue;

        // Write this line to the filtered file
        file_put_contents($options['output'], $line, FILE_APPEND);
    }

    fclose($handle);
}
else
{
    echo "Error: Unable to open the file.";
} 

?>
