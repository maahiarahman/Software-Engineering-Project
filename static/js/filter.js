document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("filterCategory").addEventListener("change", function() {
        const category = this.value;
        if (category === "All") {
            window.location.href = "/recipes";
        } else {
            window.location.href = `/recipes/filter/${category}`;
        }
    });
});
