// Sample Mock Data structure
let recipes = [
    {
        id: 1,
        title: "Sri Lankan String Hoppers (Idiyappam)",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1626074964585-f2ad58a74e2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: "45 min",
        difficulty: "Medium",
        ingredients: ["2 cups roasted rice flour", "Boiling water", "Salt", "Freshly grated coconut (for pol sambol)"],
        instructions: ["Mix rice flour and salt.", "Gradually add boiling water until a soft, non-sticky dough forms.", "Press dough through a string hopper maker onto small mats.", "Steam for 5-7 minutes until cooked.", "Serve warm with Kiri Hodi and Pol Sambol."]
    },
    {
        id: 2,
        title: "Spicy Black Pork Curry",
        category: "Dinner",
        image: "assets/images/pork_curry.png",
        time: "50 min",
        difficulty: "Medium",
        ingredients: ["1 kg pork, cubed", "3 tbsp dark roasted curry powder", "Goraka (Malabar tamarind) paste", "Black pepper", "Curry leaves & Pandan (Rampe)", "Garlic & Ginger"],
        instructions: ["Marinate pork with all spices, goraka, ginger and garlic.", "Heat oil, fry onions, curry leaves, and pandan.", "Add marinated pork and sear until browned.", "Add water to cover and slow cook until meat is tender and gravy is dark and thick.", "Serve with rice or roast paan."]
    },
    {
        id: 3,
        title: "Creamy Dhal Curry (Parippu)",
        category: "Lunch",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: "20 min",
        difficulty: "Easy",
        ingredients: ["1 cup red lentils (Masoor dhal)", "1 cup thin coconut milk", "1/2 cup thick coconut milk", "Curry leaves & Pandan", "1/2 tsp turmeric powder", "1/2 tsp unroasted curry powder", "Garlic, green chilies"],
        instructions: ["Wash dhal thoroughly.", "Boil dhal with spices, aromatics, and thin coconut milk until soft.", "Stir in thick coconut milk and simmer for 2 minutes.", "Optional: temper with mustard seeds, dried chilies, and curry leaves.", "Serve with rice or bread."]
    },
    {
        id: 4,
        title: "Kiribath (Milk Rice) with Lunu Miris",
        category: "Breakfast",
        image: "assets/images/kiribath.png",
        time: "30 min",
        difficulty: "Easy",
        ingredients: ["2 cups white raw rice (Kekulu haal)", "2 cups thick coconut milk", "Water", "Salt", "For Lunu Miris: Red onions, Maldive fish, Chili powder, Lime juice"],
        instructions: ["Boil the rice with water until soft and slightly mushy.", "Add salt to coconut milk, stir into the cooked rice.", "Cook on low heat until the milk is absorbed and rice is creamy.", "Transfer to a flat plate, flatten it, and cut into diamond shapes.", "Grind Lunu Miris ingredients together and serve alongside."]
    },
    {
        id: 5,
        title: "Chicken Lamprais",
        category: "Lunch",
        image: "https://images.unsplash.com/photo-1594917409249-1667b9319e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: "2 hrs",
        difficulty: "Hard",
        ingredients: ["Samba rice cooked in meat stock", "Mixed meat curry (Chicken/Pork/Beef)", "Fried ash plantains", "Brinjal moju (eggplant pickle)", "Seeni sambol", "Banana leaves for wrapping"],
        instructions: ["Prepare all individual components: stock rice, meat curry, plantains, moju, and sambol.", "Wilt banana leaves over an open flame.", "Place a scoop of rice in the center of the leaf.", "Arrange all curries and sambols around the rice.", "Fold the leaf into a parcel, tie it, and bake at 350°F (175°C) for 20 minutes before serving."]
    },
    {
        id: 6,
        title: "Watalappam (Coconut Custard)",
        category: "Dessert",
        image: "assets/images/watalappam.png",
        time: "1 hr",
        difficulty: "Medium",
        ingredients: ["500g Kithul Jaggery", "1 cup thick coconut milk", "5 large eggs", "Cardamom powder", "Nutmeg powder", "Cashew nuts"],
        instructions: ["Melt jaggery with a little water to form a thick syrup. Let cool.", "Beat eggs thoroughly.", "Mix the cooled jaggery syrup, coconut milk, and spices into the eggs.", "Pour into a heatproof bowl, top with cashews.", "Steam for 45 minutes until set. Serve chilled."]
    }
];

// DOM Elements - Check if they exist before using
const recipeGrid = document.getElementById('recipeGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('category-filters');
const emptyState = document.getElementById('emptyState');
const addRecipeForm = document.getElementById('addRecipeForm');
const addRecipeModalElement = document.getElementById('addRecipeModal');
const addRecipeModal = addRecipeModalElement ? new bootstrap.Modal(addRecipeModalElement) : null;

// Current State
let currentCategory = 'All';
let currentSearchTerm = '';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Check for category in URL (e.g., coming from Category Cards on Index page)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        currentCategory = categoryParam;
        // Update Filter UI status
        if (categoryFilters) {
            document.querySelectorAll('.btn-filter').forEach(btn => {
                if (btn.dataset.category === categoryParam) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }

    if (recipeGrid) {
        renderRecipes(recipes);
    }
    setupEventListeners();
});

// Render Recipes Function
function renderRecipes(recipesToRender) {
    if (!recipeGrid) return;

    recipeGrid.innerHTML = '';

    if (recipesToRender.length === 0) {
        if (emptyState) emptyState.classList.remove('d-none');
    } else {
        if (emptyState) emptyState.classList.add('d-none');

        const recipesToFilter = currentCategory === 'All' ?
            recipesToRender :
            recipesToRender.filter(r => r.category === currentCategory);

        recipesToFilter.forEach(recipe => {
            const timeInfo = recipe.time || '30 min';
            const difficultyInfo = recipe.difficulty || 'Medium';

            const cardHTML = `
                <div class="col-12 col-md-6 col-lg-4 hide-on-init">
                    <div class="card recipe-card h-100" onclick="viewRecipe(${recipe.id})">
                        <div class="recipe-img-container">
                            <span class="recipe-category-badge">${recipe.category}</span>
                            <img src="${recipe.image}" class="recipe-img" alt="${recipe.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                        </div>
                        <div class="recipe-card-body">
                            <h3 class="recipe-title">${recipe.title}</h3>
                            <div class="recipe-meta mt-auto">
                                <span><i class="bi bi-clock me-1 text-primary"></i> ${timeInfo}</span>
                                <span><i class="bi bi-bar-chart me-1 text-primary"></i> ${difficultyInfo}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            recipeGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Simple entrance animation
        setTimeout(() => {
            document.querySelectorAll('.hide-on-init').forEach((el, index) => {
                el.style.animation = `fadeUp 0.5s ease forwards ${index * 0.1}s`;
            });
        }, 10);
    }
}

// Set up event listeners for filters, search, and recipe form
function setupEventListeners() {
    // Category Filtering
    if (categoryFilters) {
        categoryFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-filter')) {
                document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                currentCategory = e.target.dataset.category;
                filterRecipes();
            }
        });
    }

    // Search Filtering
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase();
            filterRecipes();
        });
    }

    // Add Recipe Form Handling
    if (addRecipeForm && addRecipeModal) {
        addRecipeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!addRecipeForm.checkValidity()) {
                e.stopPropagation();
                addRecipeForm.classList.add('was-validated');
                return;
            }

            const newRecipe = {
                id: recipes.length + 1,
                title: document.getElementById('recipeTitle').value,
                category: document.getElementById('recipeCategory').value,
                image: document.getElementById('recipeImage').value,
                time: "25 min",
                difficulty: "Medium",
                ingredients: document.getElementById('recipeIngredients').value.split('\n').filter(i => i.trim() !== ''),
                instructions: document.getElementById('recipeInstructions').value.split('\n').filter(i => i.trim() !== '')
            };

            recipes.unshift(newRecipe);
            filterRecipes();
            addRecipeModal.hide();
            addRecipeForm.reset();
            addRecipeForm.classList.remove('was-validated');
            alert('Recipe added successfully!');
        });
    }
}

// Filtering logic
function filterRecipes() {
    const filtered = recipes.filter(recipe => {
        const matchesCategory = currentCategory === 'All' || recipe.category === currentCategory;
        const matchesSearch = recipe.title.toLowerCase().includes(currentSearchTerm) ||
            recipe.ingredients.some(i => i.toLowerCase().includes(currentSearchTerm));
        return matchesCategory && matchesSearch;
    });

    renderRecipes(filtered);
}

// Reset filters
function resetFilters() {
    if (searchInput) {
        searchInput.value = '';
        currentSearchTerm = '';
    }

    if (categoryFilters) {
        document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
        const allBtn = document.querySelector('[data-category="All"]');
        if (allBtn) allBtn.classList.add('active');
        currentCategory = 'All';
    }

    renderRecipes(recipes);
}

// View Recipe Detail Logic
function viewRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    const modalTitle = document.getElementById('viewRecipeTitle');
    const modalImage = document.getElementById('viewRecipeImage');
    const modalMeta = document.getElementById('viewRecipeMeta');
    const ingredientsList = document.getElementById('viewRecipeIngredients');
    const instructionsList = document.getElementById('viewRecipeInstructions');

    if (modalTitle) modalTitle.textContent = recipe.title;
    if (modalImage) modalImage.src = recipe.image;
    if (modalMeta) {
        modalMeta.innerHTML = `
            <span class="badge bg-primary rounded-pill me-2">${recipe.category}</span>
            <span class="me-3"><i class="bi bi-clock me-1 text-muted"></i> ${recipe.time || '30 min'}</span>
            <span><i class="bi bi-bar-chart me-1 text-muted"></i> ${recipe.difficulty || 'Medium'}</span>
        `;
    }

    if (ingredientsList) {
        ingredientsList.innerHTML = '';
        recipe.ingredients.forEach(ing => {
            ingredientsList.insertAdjacentHTML('beforeend', `<li class="mb-2"><i class="bi bi-check2-circle text-primary me-2"></i>${ing}</li>`);
        });
    }

    if (instructionsList) {
        instructionsList.innerHTML = '';
        recipe.instructions.forEach((inst, index) => {
            instructionsList.insertAdjacentHTML('beforeend', `<li class="mb-3 d-flex"><span class="badge bg-light text-primary border border-primary me-3 align-self-start mt-1">${index + 1}</span> <span>${inst}</span></li>`);
        });
    }

    const viewRecipeModalElement = document.getElementById('viewRecipeModal');
    if (viewRecipeModalElement) {
        const viewRecipeModal = bootstrap.Modal.getOrCreateInstance(viewRecipeModalElement);
        viewRecipeModal.show();
    }
}

// Inject Keyframes for Card Animations
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
