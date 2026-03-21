<?php
require_once '../includes/db.php';
require_once '../includes/functions.php';

if (isLoggedIn()) {
    redirect('../dashboard.php');
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $error = "All fields are required.";
    } else {
        $stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $username;
            redirect('../dashboard.php');
        } else {
            $error = "Invalid username or password.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login | Cooklet</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body class="d-flex flex-column min-vh-100">
    <div class="container my-auto py-5">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card p-4 rounded-4 border-0 shadow-lg text-white" style="background-color: var(--bg-card);">
                    <h2 class="text-center fw-bold mb-4" style="color: var(--primary-color); font-family: 'Playfair Display', serif;">Login</h2>
                    
                    <?php if ($error): ?>
                        <div class="alert alert-danger p-2 small"><?php echo $error; ?></div>
                    <?php endif; ?>

                    <form method="POST" action="login.php">
                        <div class="mb-3">
                            <label class="form-label text-muted small">Username</label>
                            <input type="text" name="username" class="form-control text-white border-secondary" style="background-color: rgba(255,255,255, 0.05);" required>
                        </div>
                        <div class="mb-4">
                            <label class="form-label text-muted small">Password</label>
                            <input type="password" name="password" class="form-control text-white border-secondary" style="background-color: rgba(255,255,255, 0.05);" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-medium">Login</button>
                    </form>
                    <div class="text-center mt-4">
                        <span class="text-muted small">Don't have an account?</span> <a href="register.php" class="text-decoration-none fw-medium" style="color: var(--primary-color);">Register</a>
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
