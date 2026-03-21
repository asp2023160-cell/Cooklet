<?php
require_once '../includes/db.php';
require_once '../includes/functions.php';

if (isLoggedIn()) {
    redirect('../index.php');
}

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize($_POST['username'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($email) || empty($password)) {
        $error = "All fields are required.";
    } else {
        // Check if username or email exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $email]);
        if ($stmt->fetch()) {
            $error = "Username or Email already exists.";
        } else {
            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            if ($stmt->execute([$username, $email, $hashedPassword])) {
                $success = "Registration successful! You can now login.";
            } else {
                $error = "Something went wrong. Please try again.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register | Cooklet</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body class="d-flex flex-column min-vh-100">
    <div class="container my-auto py-5">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card p-4 rounded-4 border-0 shadow-lg text-white" style="background-color: var(--bg-card);">
                    <h2 class="text-center fw-bold mb-4" style="color: var(--primary-color); font-family: 'Playfair Display', serif;">Sign Up</h2>
                    
                    <?php if ($error): ?>
                        <div class="alert alert-danger p-2 small"><?php echo $error; ?></div>
                    <?php endif; ?>
                    
                    <?php if ($success): ?>
                        <div class="alert alert-success p-2 small"><?php echo $success; ?></div>
                    <?php endif; ?>

                    <form method="POST" action="register.php">
                        <div class="mb-3">
                            <label class="form-label text-muted small">Username</label>
                            <input type="text" name="username" class="form-control text-white border-secondary" style="background-color: rgba(255,255,255, 0.05);" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted small">Email address</label>
                            <input type="email" name="email" class="form-control text-white border-secondary" style="background-color: rgba(255,255,255, 0.05);" required>
                        </div>
                        <div class="mb-4">
                            <label class="form-label text-muted small">Password</label>
                            <input type="password" name="password" class="form-control text-white border-secondary" style="background-color: rgba(255,255,255, 0.05);" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-medium">Register</button>
                    </form>
                    <div class="text-center mt-4">
                        <span class="text-muted small">Already have an account?</span> <a href="login.php" class="text-decoration-none fw-medium" style="color: var(--primary-color);">Login</a>
                    </div>
                    <div class="text-center mt-2">
                        <a href="../index.php" class="text-muted text-decoration-none small"><i class="bi bi-arrow-left"></i> Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
