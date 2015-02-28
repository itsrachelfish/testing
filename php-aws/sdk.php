<?php

require 'vendor/autoload.php';

use Aws\S3\S3Client;

// Instantiate an S3 client
$s3 = S3Client::factory(array
(
    'profile' => 'default'
));

// Define available commands
$commands = array('help', 'buckets', 'objects', 'create', 'copy', 'delete', 'move', 'quit');

// Basic information about each command
$help = array
(
    'help' => array
    (
        "This is a basic demonstration of Amazon's S3 API using readline in PHP.",
        "For more information on a command, you can say help [command].",
        "",
        " - Available commands are: %s"
    )
);

// Function to format and display help messages
function display_help($message, $replacement)
{
    // Combine message into single string
    $message = implode("\n", $message);

    // Apply replacements
    if(is_array($replacement))
        $message = vprintf($message, $replacement);
    else
        $message = sprintf($message, $replacement);

    // Generate a seperating line based on the length of the last line
    $message = explode("\n", $message);

    $length = strlen(end($message));
    $seperator = str_repeat("-", $length);
    $message[] = $seperator;

    // Output final message
    echo "\n".implode("\n", $message)."\n";
}

// Display initial help message
display_help($help['help'], implode(", ", $commands));

// Loop forever to read input from the user
$running = true;
while($running)
{
    $line = readline("> ");
    $line = explode(" ", $line);

    $command = array_shift($line);

    if(in_array($command, $commands))
    {
        if($command == "help")
        {
            $topic = array_shift($line);

            if(empty($topic))
                $topic = 'help';

            if(isset($help[$topic]))
            {
                display_help($help[$topic], implode(", ", $commands));
            }
            else
            {
                echo "Sorry! No help exists for that topic.\n";
            }
        }
        elseif($command == "buckets")
        {

        }
        elseif($command == "objects")
        {

        }
        elseif($command == "create")
        {

        }
        elseif($command == "copy")
        {

        }
        elseif($command == "delete")
        {

        }
        elseif($command == "move")
        {

        }
        elseif($command == "quit")
        {
            $running = false;
        }
    }
    else
    {
        echo "Sorry! That's not a valid command, please type 'help' for more information.\n";
    }
}

echo "\nBye!\n\n";

?>