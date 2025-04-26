document.addEventListener('DOMContentLoaded', () => {
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
  const backExisting = document.getElementById('back-from-existing');
  const backNew = document.getElementById('back-from-new');
  const optionsBlock = document.getElementById('option-buttons');

  document.querySelectorAll('.swap-button').forEach(button => {
    button.addEventListener('click', () => {
      const recipeId = button.dataset.id;
      const recipeNameValue = button.dataset.name;
      const recipeUser = button.dataset.user;
  
      recipeName.textContent = `You’re requesting a swap for: ${recipeNameValue}`;
      recipeIdField.value = recipeId;
      userIdField.value = recipeUser;
      recipeIdFieldNew.value = recipeId;
      userIdFieldNew.value = recipeUser;
  
      // THIS IS KEY: remove .hidden before setting display:flex
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
  
      existingForm.classList.add('hidden');
      existingForm.style.display = 'none';
      newForm.classList.add('hidden');
      newForm.style.display = 'none';
      optionsBlock.style.display = 'flex';
    });
  });
  
  chooseExisting?.addEventListener('click', () => {
    existingForm.classList.remove('hidden');
    existingForm.style.display = 'block';
    newForm.classList.add('hidden');
    newForm.style.display = 'none';
    optionsBlock.style.display = 'none';
  });

  chooseNew?.addEventListener('click', () => {
    newForm.classList.remove('hidden');
    newForm.style.display = 'block';
    existingForm.classList.add('hidden');
    existingForm.style.display = 'none';
    optionsBlock.style.display = 'none';
  });

  backExisting?.addEventListener('click', () => {
    existingForm.classList.add('hidden');
    existingForm.style.display = 'none';
    optionsBlock.style.display = 'flex';
  });

  backNew?.addEventListener('click', () => {
    newForm.classList.add('hidden');
    newForm.style.display = 'none';
    optionsBlock.style.display = 'flex';
  });

  function showConfirmation(message, callback) {
    const confirmBox = document.createElement("div");
    confirmBox.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    confirmBox.innerHTML = `
      <div class="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
        <h3 class="text-lg font-semibold text-green-700 mb-4">${message}</h3>
        <p class="mb-6 text-gray-600">Redirecting...</p>
        <button id="confirm-ok" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Go to Profile
        </button>
      </div>
    `;
    document.body.appendChild(confirmBox);
    document.getElementById("confirm-ok").onclick = () => {
      confirmBox.remove();
      if (callback) callback();
    };
  }

  existingForm?.addEventListener('submit', e => {
    e.preventDefault();
    showConfirmation("Swap request sent!", () => {
      window.location.href = "/dashboard";
    });
  });

  newForm?.addEventListener('submit', e => {
    e.preventDefault();
    const userId = modal?.dataset?.userId || '';
    showConfirmation("Recipe created & swap sent!", () => {
      window.location.href = `/profile/${userId}`;
    });
  });

  const toast = document.getElementById('toast');
  if (toast) {
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }
});
