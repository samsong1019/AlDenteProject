var recipeURL = '..\\HTML\\recipe.html';
// Querying TheMealDb for Recipie results that match the selected search parameters //    
function getSelectedGenreRecipes () {
    var chosenGenre = localStorage.getItem('clickedGenre');
    var queryRecipes = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + chosenGenre//+ whatever selection var is chosen from homepage;
    fetch(queryRecipes)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for(var i = 0; i < 9; i++)
        $("#recipeSuggestions").append(
            `<div class="flex flex-col border-solid border-2 border-light-blue-500 resultCards" id="${data.meals[i].idMeal}">
                <p class="h-3/6 resultsText" id="${data.meals[i].idMeal}">${data.meals[i].strMeal}</p>
                <img class="justify-self-end" src=${data.meals[i].strMealThumb} id="${data.meals[i].idMeal}">
            </div>`
        )

    });
    };

    getSelectedGenreRecipes();

var selectedRecipeCard = $("#recipeSuggestions");

selectedRecipeCard.on('click', function resultsPageToRecipePage (e) {
    console.log("button pressed!");
    var recipeCardEl = e.target.id;
    // Pulling genre selection text into local storage to feed results page display
    localStorage.setItem('clickedRecipe', recipeCardEl)
    // // Calling HTML for results page when any food genre is clicked
    function switchPage() {
        location.href = recipeURL;
    }; 

    switchPage();
    getRecipeByIdData();
}, 
);

// Event listener for the navbar button //
$("#resultsNavBtnTwo").on("click", function() {
location.href = "..\\HTML\\cookbook.html"
});