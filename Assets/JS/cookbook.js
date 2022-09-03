let recipeList = JSON.parse(localStorage.getItem("allEntries"));
//Loop to display user's list of saved recipes from local storage
for (var i = 0; i < recipeList.length; i++) {
    $("#localSavedRecipeList").append(
        `<li class="flex flex-col border-solid border-2 border-light-blue-500" id="savedRecipeListEl">
        ${recipeList[i]}
        </li>`
    )
}

// Event listener for the navbar button //
$("#resultsNavBtnFive").on("click", function() {
    location.href = "../../index.html"
    });

// Clears saved recipies 
$("#clearListBtn").on("click", function() {
    localStorage.removeItem("allEntries")
    location. reload()
    });



