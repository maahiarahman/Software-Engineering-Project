document.addEventListener("DOMContentLoaded", function () {
    console.log("Recipe Swap Loaded!");
});
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("swap.html")) {
        window.location.href = "../index.html"; 
    }
});

