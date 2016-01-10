<?php

    $name = $_POST["name"];
    $file = "decks/". $name .".json";
    $fh = fopen($file, 'w');
    $new_data = $_POST["data"];
    fwrite($fh, $new_data);
    fclose($fh);

?>
