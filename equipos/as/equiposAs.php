<?php

    $equipo = $_REQUEST["equipo"];

    $nombre;
    switch ($equipo){
        case "primera-division":
            $nombre = "primera";
            break;
        case "alaves":
            $nombre = "deportivo_alaves";
            break;
        case "athletic":
            $nombre = "athletic";
            break;
        case "atletico":
            $nombre = "atletico_madrid";
            break;
        case "barcelona":
            $nombre = "fc_barcelona";
            break;
        case "betis":
            $nombre = "real_betis";
            break;
        case "celta":
            $nombre = "real_club_celta_de_vigo";
            break;
        case "eibar":
            $nombre = "sd_eibar";
            break;
        case "espanyol":
            $nombre = "rcd_espanyol";
            break;
        case "getafe":
            $nombre = "getafe_cf";
            break;
        case "granada":
            $nombre = "granada_cf";
            break;
        case "leganes":
            $nombre = "cd_leganes";
            break;
        case "levante":
            $nombre = "levante_ud";
            break;
        case "mallorca":
            $nombre = "real_mallorca";
            break;
        case "osasuna":
            $nombre = "osasuna";
            break;
        case "real-madrid":
            $nombre = "real_madrid";
            break;
        case "real-sociedad":
            $nombre = "real_sociedad";
            break;
        case "sevilla":
            $nombre = "sevilla_futbol_club";
            break;
        case "valencia":
            $nombre = "valencia_cf";
            break;
        case "valladolid":
            $nombre = "real_valladolid";
            break;
        case "villarreal":
            $nombre = "villarreal_cf";
            break;
    }

    if ($nombre == "primera"){
        readfile("https://futbol.as.com/rss/futbol/" . $nombre . ".xml");
    } else {
        readfile("https://as.com/tag/rss/" . $nombre . "/a");
    }
    
    
?>