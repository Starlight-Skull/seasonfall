<?php

//Database Server Host
const DB_HOST = 'mysql';

// Database Server Username
const DB_USER = 'root';

// Database Server Password
const DB_PASS = 'Azerty123';

// Database Name
const DB_NAME = 'Seasonfall';

function getDatabase() {
    try {
        $db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    } catch (PDOException $e) {
        echo $e;
    }
}