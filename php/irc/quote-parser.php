<?php

$quotes = file_get_contents("./quotes.txt");
$quotes = explode("\n", $quotes);

foreach($quotes as $quote)
{
    preg_match("/^\[([^\[\]]+)\] (.*)$/", $quote, $matches);

    if($matches)
    {
        $date = date('Y-m-d H:i:s', strtotime($matches[1]));
        $quote = mysql_escape_string($matches[2]);

        echo 'Insert into `quotes` (created_at, quote) values("' . $date . '", "' . $quote .'");' . "\n";
    }

    unset($matches);
}


?>
