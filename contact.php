<?php
require_once 'includes/db.php';
require_once 'includes/functions.php';

$successMsg = '';
$errorMsg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = sanitize($_POST['name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $subject = sanitize($_POST['subject'] ?? '');
    $message = sanitize($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        $errorMsg = "Please fill in all required fields.";
    } else {
        $stmt = $pdo->prepare("INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$name, $email, $subject, $message])) {
            $successMsg = "We received your message! We will get back to you shortly.";
        } else {
            $errorMsg = "Failed to send message.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us | Cooklet</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap"
        rel="stylesheet">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body class="d-flex flex-column min-vh-100">

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top custom-navbar">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="index.php">
                <i class="bi bi-book-half brand-icon me-2"></i>
                <span>Cooklet</span>
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <i class="bi bi-list text-light fs-2"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="recipes.php">Recipes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="contact.php">Contact Us</a>
                    </li>
                    <?php if (isLoggedIn()): ?>
                        <li class="nav-item"><a class="nav-link" href="dashboard.php">Dashboard</a></li>
                        <li class="nav-item"><a class="nav-link" href="auth/logout.php">Logout</a></li>
                    <?php else: ?>
                        <li class="nav-item"><a class="nav-link" href="auth/login.php">Login</a></li>
                    <?php endif; ?>
                </ul>
                <button class="btn btn-primary btn-add-recipe rounded-pill px-4"
                    onclick="window.location.href='index.html'">
                    <i class="bi bi-search me-1"></i> Browse Recipes
                </button>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <header class="py-5 mt-5">
        <div class="container text-center py-5">
            <h1 class="display-4 fw-bold">Get In Touch</h1>
            <p class="lead text-muted max-w-500 mx-auto mt-3">We would love to hear from you! Whether you have a
                question about a recipe, a feature request, or just want to say hello.</p>
        </div>
    </header>

    <!-- Content -->
    <main class="container my-5 flex-grow-1">
        <div class="row g-5 justify-content-center">
            <div class="col-lg-5">
                <div class="card p-5 rounded-4 shadow-sm border-0 h-100" style="background-color: var(--bg-card);">
                    <h3 class="fw-bold mb-4">Contact Information</h3>
                    <div class="d-flex align-items-center mb-4">
                        <div class="icon-box rounded-circle d-flex align-items-center justify-content-center me-3"
                            style="width: 50px; height: 50px; font-size: 1.2rem; background-color: rgba(255,255,255,0.03); color: var(--primary-color);">
                            <i class="bi bi-geo-alt"></i>
                        </div>
                        <div>
                            <h6 class="fw-bold mb-1">Our Location</h6>
                            <p class="text-muted mb-0 small"> 68 4th Cross Street, Colombo 07</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center mb-4">
                        <div class="icon-box rounded-circle d-flex align-items-center justify-content-center me-3"
                            style="width: 50px; height: 50px; font-size: 1.2rem; background-color: rgba(255,255,255,0.03); color: var(--primary-color);">
                            <i class="bi bi-envelope"></i>
                        </div>
                        <div>
                            <h6 class="fw-bold mb-1">Email Us</h6>
                            <p class="text-muted mb-0 small">hello@cooklet-recipes.com</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="icon-box rounded-circle d-flex align-items-center justify-content-center me-3"
                            style="width: 50px; height: 50px; font-size: 1.2rem; background-color: rgba(255,255,255,0.03); color: var(--primary-color);">
                            <i class="bi bi-telephone"></i>
                        </div>
                        <div>
                            <h6 class="fw-bold mb-1">Call Us</h6>
                            <p class="text-muted mb-0 small">+94 11 234 5678</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-7">
                <div class="card border-0 shadow-sm rounded-4 h-100" style="background-color: var(--bg-card);">
                    <div class="card-body p-4 p-md-5">
                        <h2 class="fw-bold mb-4">Send us a message</h2>
                        <?php if ($successMsg): ?><div class="alert alert-success p-2 small"><?php echo $successMsg; ?></div><?php endif; ?>
                        <?php if ($errorMsg): ?><div class="alert alert-danger p-2 small"><?php echo $errorMsg; ?></div><?php endif; ?>
                        
                        <form method="POST" action="contact.php">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="form-floating mb-3">
                                        <input type="text" name="name" class="form-control" id="name" placeholder="John Doe" required>
                                        <label for="name">Your Name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating mb-3">
                                        <input type="email" name="email" class="form-control" id="email" placeholder="name@example.com" required>
                                        <label for="email">Email Address</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating mb-3">
                                        <input type="text" name="subject" class="form-control" id="subject" placeholder="Subject" required>
                                        <label for="subject">Subject</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <textarea name="message" class="form-control p-3" id="message" rows="5" placeholder="Write your message here..." required></textarea>
                                    </div>
                                </div>
                                <div class="col-12 text-end">
                                    <button type="submit"
                                        class="btn btn-primary rounded-pill px-5 py-2 fw-medium shadow-sm">Send
                                        Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer py-5 mt-auto">
        <div class="container text-center">
            <div class="mb-3">
                <i class="bi bi-book-half fs-2 text-primary"></i>
            </div>
            <h5 class="fw-bold mb-3">Cooklet Digital Recipe Book</h5>
            <p class="text-muted mb-4 max-w-500 mx-auto">Discover, share, and enjoy the best recipes from around the
                world. A simple, interactive way to manage your culinary adventures.</p>
            <div class="d-flex justify-content-center gap-3 mb-4">
                <a href="#" class="social-icon"><i class="bi bi-instagram"></i></a>
                <a href="#" class="social-icon"><i class="bi bi-twitter-x"></i></a>
                <a href="#" class="social-icon"><i class="bi bi-facebook"></i></a>
            </div>
            <p class="text-muted small mb-0">&copy; 2026 Cooklet. All rights reserved.</p>
        </div>
    </footer>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>

