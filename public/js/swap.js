document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    console.log("Recipe Swap Loaded!");

    const modal = document.getElementById('swap-modal');
    const recipeName = document.getElementById('modal-recipe-name');
    const recipeIdField = document.getElementById('targetRecipeId');
    const userIdField = document.getElementById('targetUserId');
    const recipeIdFieldNew = document.getElementById('targetRecipeIdNew');
    const userIdFieldNew = document.getElementById('targetUserIdNew');

    const existingForm = document.getElementById('existing-form');
    const newForm = document.getElementById('new-form');
    const chooseExisting = document.getElementById('choose-existing');
    const chooseNew = document.getElementById('choose-new');

    if (!modal || !chooseExisting || !chooseNew || !existingForm || !newForm) {
      console.warn("Missing DOM elements – form toggle logic will not run.");
      return;
    }

    // Show modal and reset forms
    document.querySelectorAll('.swap-button').forEach(button => {
      button.addEventListener('click', () => {
        console.log("Swap button clicked ✅");

        recipeName.textContent = `You’re requesting a swap for: ${button.dataset.name}`;
        recipeIdField.value = button.dataset.id;
        userIdField.value = button.dataset.user;
        recipeIdFieldNew.value = button.dataset.id;
        userIdFieldNew.value = button.dataset.user;

        modal.classList.remove('hidden');
        modal.style.display = 'flex';

        existingForm.classList.add('hidden');
        newForm.classList.add('hidden');
      });
    });

    // Close modal on background click
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        console.log("Modal backdrop clicked — closing.");
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    });

    // Toggle form visibility
    chooseExisting.addEventListener('click', () => {
      console.log("Chose existing recipe");
      existingForm.classList.remove('hidden');
      existingForm.style.display = 'block';
      newForm.classList.add('hidden');
      newForm.style.display = 'none';
    });

    chooseNew.addEventListener('click', () => {
      console.log("Chose new recipe");
      newForm.classList.remove('hidden');
      newForm.style.display = 'block';
      existingForm.classList.add('hidden');
      existingForm.style.display = 'none';
    });


    // Validate existing form
    function validateSwapForm() {
      const selected = document.getElementById('yourRecipe');
      if (!selected?.value) {
        alert('Please select a recipe to swap.');
        return false;
      }
      return true;
    }

    // Confirmation modal
    function showConfirmation(callback) {
      const confirmBox = document.createElement("div");
      confirmBox.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
      confirmBox.innerHTML = `
        <div class="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
          <h3 class="text-lg font-semibold text-green-700 mb-4">Swap request sent!</h3>
          <p class="mb-6 text-gray-600">We'll notify the other cook 🎉</p>
          <button id="confirm-ok" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Back to Dashboard
          </button>
        </div>
      `;
      document.body.appendChild(confirmBox);

      document.getElementById("confirm-ok").onclick = () => {
        confirmBox.remove();
        if (callback) callback();
      };
    }

    // Existing form submit
    existingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateSwapForm()) return;
      console.log("✅ Existing form submitted");
      showConfirmation(() => window.location.href = "/dashboard");
    });

    // New recipe form submit
    newForm.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log("✅ New recipe submitted");
      showConfirmation(() => window.location.href = "/dashboard");
    });

    // Auto-hide toast
    const toast = document.getElementById('toast');
    if (toast) {
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }
  });
});
