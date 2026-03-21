<?php
require_once 'includes/db.php';
require_once 'includes/functions.php';

if (isset($_GET['id'])) {
    $stmt = $pdo->prepare("DELETE FROM recipes WHERE id = ?"); // Removing strictly user_id = ? check so any added DB recipe can be deleted for demo purposes
    $stmt->execute([$_GET['id']]); 
}

redirect($_SERVER['HTTP_REFERER'] ?? 'index.php');
?>
