<?php

class CSV_Parser
{
    // This function maps all lines in a file to an array
    public function file_to_array($file)
    {
        return array_map('str_getcsv', file($file));
    }

    // This function maps all lines in a block of text to an array
    public function text_to_array($text)
    {
        // Normalize newlines
        $text = str_replace("\r", "\n", $text);
        $text = str_replace("\n\n", "\n", $text);
        return array_map('str_getcsv', explode("\n", $text));
    }

    // Function to search a csv generated array for certain columns and map them to an array
    public function map_columns($array, $map)
    {
        $columns = array();
        $found = 0;
        $rows = 0;

        foreach($array as $row_id => $row)
        {
            $rows++;

            foreach($row as $column_id => $column)
            {
                $column = trim($column);
                
                if(in_array($column, $map))
                {
                    $key = array_search($column, $map);
                    $columns[$column_id] = $key;
                    $found++;
                }
            }

            if(count($map) == $found)
                break;
        }

        // Slice off the number of rows we needed to determine the column map
        $array = array_slice($array, $rows);

        // Return the updated array and mapped columns
        return array($array, $columns);
    }

    // Function to loop through array and save values based on the map
    public function map_data($array, $columns)
    {
        $output = array();
        
        // Loop through remaining data
        foreach($array as $row)
        {
            $formatted_row = array();
            $valid = true;
            
            foreach($columns as $column_id => $column_name)
            {
                if(!isset($row[$column_id]))
                {
                    $valid = false;
                    break;
                }
                
                $formatted_row[$column_name] = trim($row[$column_id]);
            }

            // Only output valid CSV data
            if($valid)
                $output[] = $formatted_row;
        }

        return $output;
    }

}

?>