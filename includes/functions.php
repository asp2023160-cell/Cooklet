<?php
// Function library for authentication and sanitization
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Redirect using absolute or relative paths
function redirect($url) {
    header("Location: " . $url);
    exit;
}

// Check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Sanitize user inputs
function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Ensure the user is authenticated; if not, redirect to login
function requireLogin() {
    if (!isLoggedIn()) {
        redirect('login.php'); // Relative to current directory, adjust if needed
    }
}
?>
