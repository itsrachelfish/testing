<?php

$hello = file_get_contents('hello.json');
$hello = json_decode($hello);
print_r($hello);

$world = simplexml_load_file('world.xml');
print_r($world);

$array = array('One', 'Two', 'Three');

foreach($array as $key => $value)
{
    echo "$key - $value\n";
}

?>
