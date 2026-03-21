<?php
require_once 'includes/db.php';
require_once 'includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = sanitize($_POST['title'] ?? '');
    $category = sanitize($_POST['category'] ?? '');
    $image = sanitize($_POST['image'] ?? '');
    
    // Split ingredients and instructions by line and JSON encode them for DB storage
    $ingredientsRaw = $_POST['ingredients'] ?? '';
    $instructionsRaw = $_POST['instructions'] ?? '';
    
    $ingredients = array_filter(array_map('trim', explode("\n", $ingredientsRaw)));
    $instructions = array_filter(array_map('trim', explode("\n", $instructionsRaw)));
    
    $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

    $stmt = $pdo->prepare("INSERT INTO recipes (user_id, title, category, image, time, difficulty, ingredients, instructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    // Default time and difficulty
    $time = "25 min";
    $difficulty = "Medium";
    
    if ($stmt->execute([$user_id, $title, $category, $image, $time, $difficulty, json_encode(array_values($ingredients)), json_encode(array_values($instructions))])) {
        redirect($_SERVER['HTTP_REFERER'] ?? 'index.php');
    } else {
        die("Error saving recipe.");
    }
}
?>
