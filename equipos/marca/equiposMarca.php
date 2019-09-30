<?php

    $equipo = $_REQUEST["equipo"];
    readfile("https://e00-marca.uecdn.es/rss/futbol/" . $equipo . ".xml");
    
?>