// Sample Mock Data structure
const initialRecipes = [
    {
        id: 1,
        title: "String Hoppers",
        category: "Breakfast",
        image: "assets/images/string hoppers.jpg",
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
        title: "Dhal Curry",
        category: "Lunch",
        image: "assets/images/dhal_curry.jpg",
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
        image: "assets/images/chicken_lamprais.jpg",
        time: "2 hrs",
        difficulty: "Hard",
        ingredients: ["Samba rice cooked in meat stock", "Mixed meat curry (Chicken/Pork/Beef)", "Fried ash plantains", "Brinjal moju (eggplant pickle)", "Seeni sambol", "Banana leaves for wrapping"],
        instructions: ["Prepare all individual components: stock rice, meat curry, plantains, moju, and sambol.", "Wilt banana leaves over an open flame.", "Place a scoop of rice in the center of the leaf.", "Arrange all curries and sambols around the rice.", "Fold the leaf into a parcel, tie it, and bake at 350°F (175°C) for 20 minutes before serving."]
    },
    {
        id: 6,
        title: "Watalappam",
        category: "Dessert",
        image: "assets/images/watalappam.png",
        time: "1 hr",
        difficulty: "Medium",
        ingredients: ["500g Kithul Jaggery", "1 cup thick coconut milk", "5 large eggs", "Cardamom powder", "Nutmeg powder", "Cashew nuts"],
        instructions: ["Melt jaggery with a little water to form a thick syrup. Let cool.", "Beat eggs thoroughly.", "Mix the cooled jaggery syrup, coconut milk, and spices into the eggs.", "Pour into a heatproof bowl, top with cashews.", "Steam for 45 minutes until set. Serve chilled."]
    },
    {
        id: 7,
        title: "Pittu",
        category: "Breakfast",
        image: "assets/images/pittu.jpg",
        time: "40 min",
        difficulty: "Medium",
        ingredients: ["2 cups roasted rice flour", "1 cup freshly grated coconut", "Salt to taste", "Water", "Warm coconut milk (for serving)"],
        instructions: ["Mix roasted rice flour and salt in a bowl.", "Gradually sprinkle water and mix the flour to form small crumbly granules.", "Gently mix in the freshly grated coconut.", "Steam the mixture in a Pittu bamboo maker or steamer for 10-15 minutes.", "Push the steamed pittu out and serve hot with warm coconut milk, lunu miris, or meat curry."]
    },

    {
        id: 8,
        title: "Ceylon Crab Curry",
        category: "Dinner",
        image: "assets/images/crab_curry.png",
        time: "1 hr 15 min",
        difficulty: "Hard",
        ingredients: ["1 kg mud crabs, cleaned and halved", "2 cups thick coconut milk", "3 tbsp roasted Sri Lankan curry powder", "2 tbsp chili powder (adjust to taste)", "1/2 tsp turmeric powder", "1 large onion, sliced", "Curry leaves and pandan leaf", "Ginger and garlic paste", "2 tbsp tamarind juice/paste", "Drumstick leaves (Murunga leaves) - optional"],
        instructions: ["Marinate the cleaned crabs with turmeric, half the chili powder, and salt.", "Heat oil in a large clay pot. Fry onions, ginger-garlic paste, curry leaves, and pandan until aromatic.", "Add the roasted curry powder, remaining chili powder, and sauté for a minute to release flavors.", "Add the crab pieces and stir well to coat them in the spice mixture.", "Pour in the coconut milk and tamarind juice. Bring to a boil.", "Reduce heat and simmer until the crab is cooked and the gravy thickens (about 30-40 minutes).", "Add drumstick leaves in the last 5 minutes of cooking if using.", "Serve hot with roast paan (bread) or steamed rice."]
    }

];

// Local Storage Initialization
let recipes = JSON.parse(localStorage.getItem('cooklet_recipes')) || initialRecipes;

function saveRecipes() {
    localStorage.setItem('cooklet_recipes', JSON.stringify(recipes));
}

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
    // Check for category in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        currentCategory = categoryParam;
        // Update UI if filters exist
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
                            <button class="btn btn-danger position-absolute top-0 start-0 m-3 rounded-circle shadow-sm" onclick="deleteRecipe(event, ${recipe.id})" style="width: 35px; height: 35px; padding: 0; display: flex; align-items: center; justify-content: center; z-index: 10; background-color: rgba(220, 53, 69, 0.9); backdrop-filter: blur(4px); border: none;">
                                <i class="bi bi-trash"></i>
                            </button>
                            <img src="${recipe.image}" class="recipe-img" alt="${recipe.title}" loading="lazy" onerror="this.src='images/string hoppers.jpg'">
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

        // Add a simple entrance animation
        setTimeout(() => {
            document.querySelectorAll('.hide-on-init').forEach((el, index) => {
                el.style.animation = `fadeUp 0.5s ease forwards ${index * 0.1}s`;
            });
        }, 10);
    }
}

// Set up event listeners for filters, search, and form
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

    // Form Validation & Submission
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

            // Save to local storage
            saveRecipes();

            alert('Recipe added successfully!');
        });
    }
}

// Logic to filter recipes based on both category and search term
function filterRecipes() {
    const filtered = recipes.filter(recipe => {
        const matchesCategory = currentCategory === 'All' || recipe.category === currentCategory;
        const matchesSearch = recipe.title.toLowerCase().includes(currentSearchTerm) ||
            recipe.ingredients.some(i => i.toLowerCase().includes(currentSearchTerm));
        return matchesCategory && matchesSearch;
    });

    renderRecipes(filtered);
}

// Reset filters function
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

// Add CSS keyframes for animation dynamically
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

// View Recipe Function
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

// Delete Recipe Logic
function deleteRecipe(event, id) {
    // Prevent the card's onclick (viewRecipe) from triggering
    event.stopPropagation();
    
    // Confirm deletion
    if (confirm("Are you sure you want to delete this recipe?")) {
        // Remove recipe from array
        recipes = recipes.filter(r => r.id !== id);

        // Save to local storage
        saveRecipes();
        
        // Re-apply current filters and re-render the grid
        filterRecipes();
    }
}
