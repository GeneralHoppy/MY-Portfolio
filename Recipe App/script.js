const apiKey = "d26e5fe1b3f6457cb4301c3bc203e1e3"; // Your actual API key
const recipeContainer = document.getElementById("recipe-container");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  const query = document.getElementById("search-input").value;
  fetchRecipes(query);
});

async function fetchRecipes(query) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeContainer.innerHTML =
      "<p>Failed to fetch recipes. Please try again.</p>";
  }
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = ""; // Clear previous results
  if (recipes.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }
  recipes.forEach((recipe) => {
    console.log(recipe); // Log recipe object for debugging
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";

    // Format title for the URL
    const formattedTitle = recipe.title.replace(/\s+/g, "-").toLowerCase();

    recipeCard.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p><a href="https://spoonacular.com/recipes/${formattedTitle}-${recipe.id}" target="_blank">View Recipe</a></p>
        `;
    recipeContainer.appendChild(recipeCard);
  });
}
