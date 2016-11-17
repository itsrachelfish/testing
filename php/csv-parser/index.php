<h1>Convert CSV to JSON</h1>

<form method="post">
    <div>
        <b>Map</b>
        <textarea name="map"><?php echo $_POST['map']; ?></textarea>
    </div>

    <div>
        <b>CSV</b>
        <textarea name="csv"><?php echo $_POST['csv']; ?></textarea>
    </div>
    
    <input type="submit" value="Convert">
</form>

<?php

if($_POST)
{
    require("parser.php");
    $parser = new CSV_Parser();

    // Convert posted map to an array
    $text_map = explode("\n", $_POST['map']);
    $map = array();

    foreach($text_map as $row)
    {
        $row = explode("=", $row);
        $map[trim($row[0])] = trim($row[1]);
    }

    $csv = $parser->text_to_array($_POST['csv']);
    list($csv, $columns) = $parser->map_columns($csv, $map);
    $csv = $parser->map_data($csv, $columns);

    echo "<hr>";
    echo json_encode($csv);
}

?>