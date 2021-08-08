<?php

echo "Please enter a test string: \n";
$message = rtrim(fgets(STDIN));

echo "Testing switch statement using break \n";

switch($message) {
  case "hi":
    echo "Hi there!! \n";
  break;

  case "hello":
    echo "Howdy :) \n";
  break;

  default:
    echo "Well golly \n";
  break;
}

echo "Testing switch statement using curly braces \n";

switch($message) {
  case "hi": {
    echo "Hi there!! \n";
  }
  case "hello": {
    echo "Howdy :) \n";
  }

  default: {
    echo "Well golly \n";
  }
}

?>
