// Handling Review Form Submission
document.getElementById("review-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const recipeName = document.getElementById("recipe-name").value;
    const reviewText = document.getElementById("review-text").value;
    
    console.log("New Review Submitted:", recipeName, reviewText);
    alert("Your review has been posted!");
    
    document.getElementById("review-form")?.reset();
});

// Adding event listeners to check if elements exist before adding event listeners
const reviewElement = document.getElementById('reviewElementId');
if (reviewElement) {
    reviewElement.addEventListener('click', function() {
        console.log("Review element clicked!");
    });
} else {
    console.warn('Review element not found: #reviewElementId');
}
