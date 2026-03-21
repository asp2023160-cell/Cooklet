<?php
$host = 'localhost';
$dbname = 'cooklet_db';
$username = 'root'; // Default XAMPP username
$password = ''; // Default XAMPP password

try {
    $pdo = new PDO("mysql:host=$host", $username, $password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database if it doesn't exist and select it
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname`");
    $pdo->exec("USE `$dbname`");
    
} catch(PDOException $e) {
    die("ERROR: Could not connect to the database. Make sure XAMPP/WAMP MySQL is running! " . $e->getMessage());
}
?>
