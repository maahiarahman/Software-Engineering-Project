// Handling Recipe Form Submission
document.getElementById("recipe-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const recipeName = document.getElementById("recipe-name").value;
    const recipeDescription = document.getElementById("recipe-description").value;
    
    console.log("Recipe Posted:", recipeName, recipeDescription);
    alert("Your recipe has been posted!");
});

// Adding event listeners to check if elements exist before adding event listeners
const recipeElement = document.getElementById('recipeElementId');
if (recipeElement) {
    recipeElement.addEventListener('click', function() {
        console.log("Recipe element clicked!");
    });
} else {
    console.warn('Recipe element not found: #recipeElementId');
}
