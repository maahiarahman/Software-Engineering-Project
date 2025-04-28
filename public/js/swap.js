document.addEventListener('DOMContentLoaded', () => {
  console.log('Recipe Swap Loaded!');
  // Grab modal/form elements
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

  // Open modal on button click
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
      modal.style.display = 'flex';
      modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  // Modal close function for X button
  window.closeModal = function () {
    modal.style.display = 'none';
  };

  // Confirmation and redirect after sending
  function showConfirmation(message, redirectUrl) {
    // Remove any existing popups
    const old = document.getElementById('swap-confirm-box');
    if (old) old.remove();
  
    let seconds = 3;
    // Inline styles for absolute, simple pop up
    const confirmBox = document.createElement('div');
    confirmBox.id = 'swap-confirm-box';
    confirmBox.style = `
      position: fixed; z-index: 9999; left: 0; top: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center;
    `;
    confirmBox.innerHTML = `
      <div style="background: #fff; border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.18); padding: 2rem 2.5rem; min-width: 320px; text-align: center;">
        <h2 style="color:#198754;font-size:2rem;font-weight:800;margin-bottom:.5rem;">${message}</h2>
        <div style="font-size:2rem;margin:1rem 0;font-weight:700;color:#198754;">
          <span id="swap-countdown">${seconds}</span> seconds
        </div>
        <p style="margin:0 0 1.3rem 0;color:#444;">Redirecting you to your profile page...</p>
        <button id="confirm-ok" style="padding:0.8rem 1.5rem;font-size:1.1rem;font-weight:600;border-radius:12px;background:#198754;color:#fff;border:none;cursor:pointer;">
          Go Now
        </button>
      </div>
    `;
    document.body.appendChild(confirmBox);
  
    const countdownSpan = document.getElementById('swap-countdown');
    let timer = setInterval(() => {
      seconds--;
      countdownSpan.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(timer);
        confirmBox.remove();
        window.location.href = redirectUrl;
      }
    }, 1000);
  
    document.getElementById("confirm-ok").onclick = () => {
      clearInterval(timer);
      confirmBox.remove();
      window.location.href = redirectUrl;
    };
  }
  

  // Figure out correct profile URL
  let userProfileUrl = "/profile";
  try {
    if (window.user && window.user.id) {
      userProfileUrl = `/profile/${window.user.id}`;
    }
  } catch (e) {}

  // --- HANDLERS WITH CONSOLE DEBUGGING ---
  existingForm?.addEventListener('submit', e => {
    console.log("Existing form submitted!");
    e.preventDefault();
    showConfirmation("Swap request sent!", userProfileUrl);
  });

  newForm?.addEventListener('submit', e => {
    console.log("New form submitted!");
    e.preventDefault();
    showConfirmation("Recipe created & swap sent!", userProfileUrl);
  });

  // Toast fade out
  const toast = document.getElementById('toast');
  if (toast) {
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }
});
