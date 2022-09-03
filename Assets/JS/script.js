// variables
var searchFormEl = document.getElementById("search-form");
var APIKey = "1";
var recipeOTDContainer = document.getElementById("recipe-today")
var searchGenre = document.getElementById("searchGenre");
var resultsURL = 'Assets/HTML/results.html';
var recipeURL = 'groupproject1/Assets/HTML/recipe.html';
var drinkOTDContainer = document.getElementById("drink-today");

// Array to hold ALL meal options. Not sure yet if I'll need this
var allCategories = [];
var allCategoryMeals = [];
var allMeals = [];
var allMealDetails = [];

// Clicked element to send to results page
globalThis.mySharedData = {resultsData: ''};


//object for meal of the day
var mealOTD = {
    ingredients: [],
    measurements: [],
    recipe: "",
    timeDataWasRetrieved: "",
    instructions: "",
}

var drinkPairing = {
    ingredients: [],
    measurements:[],
    recipe: "",
    instructions:"",
}


// Indigo's code
// Search API
function getRecipeArray () {


// Autocomplete Widget
$(function () {

    // first, I want to fetch lists of data
    urlList = 'https://www.themealdb.com/api/json/v1/1/list.php?';
    listCategories = urlList + 'c=list';
    listIngredients = urlList + 'i=list';
    listArea = urlList + 'a=list';
    console.log(listCategories);

    fetch(listCategories)
    .then(function (res) {
        if (!res.ok) {
            throw res.json(); 
        }
        return res.json(); 
    })

    .then (function (categoryData) {
        //console.log(categoryData);
        catLength = categoryData.meals.length;
        console.log(catLength);

        for (i = 0; i < catLength; i++) {
            // Loop through each category in categoryData, and list all recipes in each category.
            var category = (JSON.stringify(categoryData.meals[i].strCategory)).toLowerCase();
            category = JSON.parse(category);
            
            allCategories.push(category);
            urlSearchCat = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + allCategories[i];

            // Request data from each url
            fetch (urlSearchCat)
            .then(function (res3) {
                if (!res3.ok) {
                    throw res3.json(); 
                }
                return res3.json(); 
            })
            .then (function(print) {
                //allCategoryMeals.push(print.meals);
                for (b = 0; b < print.meals.length; b++) {
                    var pms = print.meals[b].strMeal;
                allMeals.push(pms);
                
                }

            })

        }
         
    });

    $('#search-text').autocomplete({
        source: allMeals,
    });
     
})

};

getRecipeArray();

// For Search by Genre
// This selects all li elements (the 14 categories) inside the ul 
var selectedGenre = searchGenre.querySelectorAll('li');
//console.log(selectedGenre[4].innerHTML);

// Loop through each category to give each of the li elements a click event
for (z = 0; z < 14; z++) {

    
    selectedGenre[z].addEventListener('click', function homePageToResultsPage (event) {
        console.log(event.target);
        var listEl = event.target;
        localStorage.setItem('clickedGenre', listEl.innerHTML)
        // Calling HTML for results page when any food genre is clicked
        function switchPage() {
            location.href = resultsURL;
            localStorage.setItem('type', 'genre');
        }; 

        switchPage();
    }, 
    );

}      

// Click listener function for search bar
function handleSearchForm(event) {
    event.preventDefault();

    console.log('clicked');
    var userInput = document.getElementById("search-text").value;
    console.log(userInput);

    //var searchNameUrl = 'www.themealdb.com/api/json/v1/1/search.php?s=' + userInput;
    
    // Set chosen name into local storage
    localStorage.setItem('clickedName', userInput);
    

     // Calling HTML for results page when any food genre is clicked
     function switchPage() {
        location.href = 'Assets/HTML/recipe.html';
        localStorage.setItem('type', 'name');
    }; 
    switchPage();


}

// Click listener for search bar
searchFormEl.addEventListener('submit', handleSearchForm);



// Calvin's code
function makeHTML(mealData) {
    var h1El = document.createElement('h1');
    h1El.textContent = "Try the Recipe of the Day...";
    h1El.setAttribute('id', 'h1-el');

    var h2El = document.createElement('h2');
    h2El.textContent = mealData.recipe;
    h2El.setAttribute('id', 'h2-el');

    var h4El = document.createElement('h4');
    h4El.textContent = "Ingredients:" 

    var ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'ingredients');
    
    for (var i = 0; i< mealData.ingredients.length ;i++){
        var ingredientsItem = document.createElement('li');
        ingredientsItem.textContent = mealData.measurements[i] + " " + mealData.ingredients[i];
        ulEl.appendChild(ingredientsItem);
    }

    var instructionsEl = document.createElement('p')
    instructionsEl.textContent = "Instructions: " + mealData.instructions;

    recipeOTDContainer.append(h1El, h2El, h4El, ulEl, instructionsEl)
}

function makedrinkHTML(drinkData){
    var h1drinkEl = document.createElement('h1');
    h1drinkEl.textContent = "Pair with: " 
    h1drinkEl.setAttribute('id', 'h1-el-drink');

    var h2drinkEl = document.createElement('h2');
    h2drinkEl.textContent =  drinkData.recipe;
    h2drinkEl.setAttribute('id', 'h2-el');


    var h4drinkEl = document.createElement('h4');
    h4drinkEl.textContent = "Ingredients:" 

    var uldrinkEl = document.createElement('ul');
    uldrinkEl.setAttribute('id', 'ingredients');

    
    for (var i = 0; i< drinkData.ingredients.length ;i++){
        var drinkingredientsItem = document.createElement('li');
        drinkingredientsItem.textContent = drinkData.measurements[i] + " " + drinkData.ingredients[i];
        uldrinkEl.appendChild(drinkingredientsItem);
        if (drinkingredientsItem.textContent == 'null null') {
            drinkingredientsItem.setAttribute('style', 'display: none');
          }
    }

    var drinkinstructionsEl = document.createElement('p')
    drinkinstructionsEl.textContent = "Instructions: " + drinkData.instructions;

    drinkOTDContainer.append(h1drinkEl, h2drinkEl, h4drinkEl, uldrinkEl, drinkinstructionsEl)
    
}

function getData() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            mealOTD.recipe = data.meals[0].strMeal
            mealOTD.instructions = data.meals[0].strInstructions
            var meal = data.meals[0]
            for (var e = 1; e < 21; e++) {
                var ingredient = mealOTD["strIngredient" + e]
                var measurement = mealOTD["strMeasure" + e]
                if (ingredient !== null && ingredient !== "") {
                    mealOTD.ingredients.push(meal["strIngredient" + e])
                }

                if (measurement !== null && measurement !== "") {
                    mealOTD.measurements.push(meal["strMeasure" + e])
                }
            }
            var today =  moment().format('YYYY-MM-DD');
            console.log(today)
            mealOTD.timeDataWasRetrieved = today
            localStorage.setItem('mealOfTheDay', JSON.stringify(mealOTD))
            makeHTML(mealOTD)
        })
}

function getDrinkData(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        drinkPairing.recipe = data.drinks[0].strDrink
        drinkPairing.instructions = data.drinks[0].strInstructions
        var drink = data.drinks[0]
        for (var i = 1; i < 5; i++) {
            var ingredient = drinkPairing["strIngredient" + i]
            var measurement = drinkPairing["strMeasure" + i]
            if (ingredient !== null && ingredient !== "") {
                drinkPairing.ingredients.push(drink["strIngredient" + i])
            }
            if (measurement !== null && measurement !== "") {
                drinkPairing.measurements.push(drink["strMeasure" + i])
            }
        }
        makedrinkHTML(drinkPairing)
    })  
}




function generateRecipeOTD() {
    while (recipeOTDContainer.firstChild) {
        recipeOTDContainer.removeChild(recipeOTDContainer.firstChild)
    }

    var savedData = localStorage.getItem('mealOfTheDay') // read from local storage

    
    if (savedData !== null) {
        // use the data already
        var todaysDate = moment().format('YYYY-MM-DD')
        if (moment(todaysDate).isAfter(mealOTD.timeDatawasRetrieved)) {
            getData()
            getDrinkData()
        } else {
            // use saved data
            var parsedData = JSON.parse(savedData)
            makeHTML(parsedData)
            getDrinkData()
        }
    } else {
        getData()
        getDrinkData();
    }
}
generateRecipeOTD();

$("#resultsNavBtnOne").on("click", function() {
    location.href = "Assets/HTML/cookbook.html"
    });

