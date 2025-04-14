const searchFunction = () => {
    const searchInput = document.getElementById('usersearch');
    const filter = searchInput.value.toUpperCase();
    const searchContainer = document.getElementById('searchcontainer');
    const searchOptions = document.querySelectorAll('.searchresults');
    const recipeName = searchContainer.getElementsByTagName('a');

    for (var i = 0; i < recipeName.length; i++) {
        let match = searchOptions[i].getElementsByTagName('a')[0];

        if(match){
        let textValue = match.textContent || match.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1) {
            searchOptions[i].style.display = "block";
        } else {
            searchOptions[i].style.display = "none";
        }
        }
    
    
    if (filter.length > 0) {
        searchContainer.style.display = "block";
    } else {
        searchContainer.style.display = "none";
    } 
        }
};


