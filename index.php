<!DOCTYPE html>
<?php

if (isset($_GET['page'])) {
}
$page = $_GET['page'];
if ($page == "login") {
    require_once "login.php";
} elseif ($page == "db") {
    require_once "homepage.php";
} elseif ($page == "odb") {
    require_once "owner_dashboard.php";
} elseif ($page == "pl") {
    require_once "parkinglots.php";
} elseif ($page == "bk") {
    require_once "booking.php";
} elseif ($page == "us") {
    require_once "user.php";
} elseif ($page == "on") {
    require_once "owner.php";
} elseif ($page == "opl") {
    require_once "owner_parkinglots.php";
} elseif ($page == "obk") {
    require_once "owner_booking.php";
} elseif ($page == "ui") {
    require_once "user_info.php";
} elseif ($page == "oi") {
    require_once "owner_info.php";
} elseif ($page == "upl") {
    require_once "update_parkinglot.php";
} elseif ($page == "uu") {
    require_once "update_user.php";
} elseif ($page == "au") {
    require_once "add_user.php";
} elseif ($page == "ao") {
    require_once "add_owner.php";
} elseif ($page == "apl") {
    require_once "add_parkinglot.php";
} elseif ($page == "aa") {
    require_once "add_area.php";
}
else require_once "login.php";
?>