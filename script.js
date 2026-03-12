/* 1. Initialization & Global Setup */
document.addEventListener('DOMContentLoaded', () => {
    // Initializes event listeners once the page loads
    setupEventListeners();
    
    // Injects dynamic CSS for entrance animations 
    // (Used by various components for a premium feel)
    injectAnimationCSS();
});
/* 2. Modal Logic (Add New Recipe) */
// This handles the state of the "Add Recipe" popup on the Home page
const addRecipeForm = document.getElementById('addRecipeForm');
const addRecipeModalElement = document.getElementById('addRecipeModal');
const addRecipeModal = addRecipeModalElement ? new bootstrap.Modal(addRecipeModalElement) : null;
function setupEventListeners() {
    if (addRecipeForm && addRecipeModal) {
        addRecipeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Form validation check
            if (!addRecipeForm.checkValidity()) {
                e.stopPropagation();
                addRecipeForm.classList.add('was-validated');
                return;
            }
            // Logic to capture new recipe data
            const newRecipe = {
                title: document.getElementById('recipeTitle').value,
                category: document.getElementById('recipeCategory').value,
                image: document.getElementById('recipeImage').value,
                ingredients: document.getElementById('recipeIngredients').value.split('\n'),
                instructions: document.getElementById('recipeInstructions').value.split('\n')
            };
            // Success feedback
            addRecipeModal.hide();
            addRecipeForm.reset();
            alert('Recipe added successfully!');
        });
    }
}
/* 3. Helper: Dynamic Animation Injection */
function injectAnimationCSS() {
    const style = document.createElement('style');
    style.innerHTML = `
        .hide-on-init {
            opacity: 0;
            transform: translateY(20px);
        }
        @keyframes fadeUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}
/* 4. Navigation & Redirects */
// Category cards on index.html use direct HTML links to pass parameters:
// Example: <a href="recipes.html?category=Breakfast">