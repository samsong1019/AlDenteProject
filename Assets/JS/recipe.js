var savedMealIndex = [];
var clickedRecipeId = localStorage.getItem('clickedRecipe');
var clickedRecipeName = localStorage.getItem('clickedName');


var generatedMeal = {
  ingredients: [],
  measurements: [],
  recipe: "",
  instructions: "",
}

function generateHTML (selectedMealData) {
  var h1El = document.getElementById('recipe-title');
  var ingredientsEl = document.getElementById('ingredient-cont');
  var instructionsEl = document.getElementById('instructions-cont');
  var ingredientsListEl = document.getElementById('ingredients-list');

  h1El.textContent = selectedMealData.recipe

  var instructionsText = document.createElement('p');
  instructionsText.textContent = selectedMealData.instructions
  instructionsText.setAttribute('id', 'instructions-text');

  for (var i = 0; i< selectedMealData.ingredients.length ;i++){
    var ingredientsItem = document.createElement('li');
    ingredientsItem.textContent = selectedMealData.measurements[i] + " " + selectedMealData.ingredients[i];
    ingredientsListEl.appendChild(ingredientsItem);
    if (ingredientsItem.textContent == 'null null') {
      ingredientsItem.setAttribute('style', 'display: none');
    }
}

  instructionsEl.append(instructionsText)
  ingredientsEl.append(ingredientsListEl)

  
};

function getRecipeByIdData(){
  fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + clickedRecipeId)
    .then(function (response) {
      return response.json()
  })
    .then(function (data) {
      generatedMeal.recipe = data.meals[0].strMeal
      generatedMeal.instructions = data.meals[0].strInstructions
      var meal = data.meals[0]
      for (var e = 1; e < 21; e++) {
        var ingredient = generatedMeal["strIngredient" + e]
        var measurement = generatedMeal["strMeasure" + e]
        if (ingredient !== null && ingredient !== "") {
            generatedMeal.ingredients.push(meal["strIngredient" + e])
        }

        if (measurement !== null && measurement !== "") {
            generatedMeal.measurements.push(meal["strMeasure" + e])
        }
    }
    generateHTML(generatedMeal)
  })
};

function whichType() {
  if (localStorage.getItem('type') === 'genre') {
    getRecipeByIdData();
  }
  else if (localStorage.getItem('type') === 'name') {
    getRecipeByNameData()
  }
};

whichType()

function getRecipeByNameData(){
  console.log('yelp');
  console.log(JSON.stringify(clickedRecipeName));
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + clickedRecipeName)
    .then(function (response) {
      return response.json()
  })
    .then(function (data) {
      generatedMeal.recipe = data.meals[0].strMeal;
      //console.log(generatedMeal.recipe);
      generatedMeal.instructions = data.meals[0].strInstructions;
      var meal = data.meals[0]
      for (var e = 1; e < 21; e++) {
        var ingredient = generatedMeal["strIngredient" + e]
        var measurement = generatedMeal["strMeasure" + e]
        if (ingredient !== null && ingredient !== "") {
            generatedMeal.ingredients.push(meal["strIngredient" + e])
        }

        if (measurement !== null && measurement !== "") {
            generatedMeal.measurements.push(meal["strMeasure" + e])
        }


    }
    generateHTML(generatedMeal);
  }) 
};

//Sets and updates running list in local storage with user's saved recipes
function addEntry() {
  // Parse any JSON previously stored in allEntries
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  if(existingEntries == null) existingEntries = [];
  var recipeName = document.getElementById("recipe-title").textContent;
  var entry = recipeName;
  
  localStorage.setItem("entry", JSON.stringify(entry));
  // Save allEntries back to local storage
  existingEntries.push(entry);
  localStorage.setItem("allEntries", JSON.stringify(existingEntries));
};

//Save button evokes above function and provides window alert
$("#saveToCookbookBtn").on("click", (e) => {
  e.preventDefault();
  alert("Recipe saved to your Cookbook!");
  addEntry();
});

//Navbar functionality
$("#resultsNavBtnThree").on("click", function() {
  console.log("Button clicked!!");
  location.href = "..\\HTML\\cookbook.html"
  });