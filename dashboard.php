<?php
require_once 'includes/db.php';
require_once 'includes/functions.php';
requireLogin();

// Fetch user's recipes
$stmt = $pdo->prepare("SELECT * FROM recipes WHERE user_id = ? ORDER BY created_at DESC");
$stmt->execute([$_SESSION['user_id']]);
$userRecipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($userRecipes as &$r) {
    $r['ingredients'] = json_decode($r['ingredients'], true) ?: [];
    $r['instructions'] = json_decode($r['instructions'], true) ?: [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard | Cooklet</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
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
                    <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="recipes.php">Recipes</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.php">Contact Us</a></li>
                    <li class="nav-item"><a class="nav-link active" href="dashboard.php">Dashboard</a></li>
                    <li class="nav-item"><a class="nav-link" href="auth/logout.php">Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="pt-5 mt-4"></div>

    <main class="container my-5 flex-grow-1">
        <h2 class="fw-bold mb-4">Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
        
        <div class="card p-4 rounded-4 shadow-sm border-0" style="background-color: var(--bg-card); color: var(--text-dark);">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="mb-0">Your Submitted Recipes</h4>
                <a href="index.php" class="btn btn-outline-primary btn-sm rounded-pill px-3">Add New</a>
            </div>
            
            <?php if (empty($userRecipes)): ?>
                <div class="text-center py-5">
                    <p class="text-muted">You haven't added any custom recipes to the database yet!</p>
                    <a href="index.php" class="btn btn-primary rounded-pill px-4 mt-2">Browse & Add Recipes</a>
                </div>
            <?php else: ?>
                <div class="row g-4">
                    <?php foreach ($userRecipes as $recipe): ?>
                        <div class="col-md-4">
                            <div class="card bg-dark text-white border-secondary h-100 recipe-card">
                                <span class="recipe-category-badge"><?php echo htmlspecialchars($recipe['category']); ?></span>
                                <img src="<?php echo htmlspecialchars($recipe['image']); ?>" class="card-img-top recipe-img" style="height: 200px; object-fit: cover;">
                                <div class="card-body pb-0 recipe-card-body">
                                    <h5 class="recipe-title mt-2"><?php echo htmlspecialchars($recipe['title']); ?></h5>
                                    <p class="card-text small text-muted"><i class="bi bi-clock me-1"></i> <?php echo htmlspecialchars($recipe['time']); ?></p>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer py-5 mt-auto">
        <div class="container text-center">
            <h5 class="fw-bold mb-3">Cooklet Digital Recipe Book</h5>
            <p class="text-muted small mb-0">&copy; 2026 Cooklet. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
