let darkMode = localStorage.getItem('darkMode');
const darkModeBtn = document.querySelector('.dark'); 

const enableDark = () => { 
    document.body.classList.add('dark-mode'); 
    localStorage.setItem('darkMode', 'enabled');
}
const disableDark = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    
}

if (darkMode === 'enabled') {
    enableDark();
    
}

darkModeBtn.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    if (darkMode !=='enabled') {
        enableDark();
    } else {
        disableDark();
    }
});