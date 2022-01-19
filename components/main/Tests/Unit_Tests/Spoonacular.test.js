import * as spoonacular from '../../Support/Spoonacular'
let apiKeys = ['80256361caf04b358f4cd2de7f094dc6', '4a53e799e6134b139ddc05f3d97f7136', '4a418dc794ec4390a4d7c7f21ae271da', '3751e70010854bfb8d9872ebdad31e9d', '641c4d9919ae47a6b16557423d352d2b', '4bba3cde5e144078aeaf8251b10702df', '7fb5963e52254260920e9d7394d85e01'];

function getApiKeyFromString(stringParam,start,end){
    const apiKey = stringParam.substring(start,end)
    //console.log("apiKey: ", apiKey)
    return apiKey
}

describe('Spoonacular.js', () => {
    test('UNIT TEST 01. Spoonacular.js creates a complex recipe search API query as expected.', () => {
        var expectedString = ""
        const ingredients = "steak"
        const intolerances = "Peanut"
        const diet = "Gluten Free"

        const complexSearchQuery = spoonacular.createComplexSearchApiQuery(ingredients, intolerances, diet, "min-missing")
        console.log("Generated complex query: ", complexSearchQuery)

        const apiKey = getApiKeyFromString(complexSearchQuery, 57, 89)

        if (apiKeys.includes(apiKey)){
            expectedString = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeIngredients=" + ingredients + "&number=6&sort=min-missing-ingredients&fillIngredients=true&instructionsRequired=true&intolerances=" + intolerances + "&diet=" + diet + "&ignorePantry=false"
        }
        console.log("Expected complex query: ", expectedString)

        expect(complexSearchQuery).toBe(expectedString);
    })
    
    test('UNIT TEST 02. Spoonacular.js creates a recipe API query as expected.', () => {
        var expectedString = ""
        const recipeId = "633338"
        
        const recipeApiQuery = spoonacular.createRecipeApiQuery(recipeId)

        const apiKey = getApiKeyFromString(recipeApiQuery,62,94)
        console.log("apiKey: ", apiKey)

        if (apiKeys.includes(apiKey)){
            expectedString = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey  + "&includeNutrition=true"
            console.log("expectedString: ", expectedString)
        }

        expect(recipeApiQuery).toBe(expectedString);
    })


    // INTEGRATION TESTS
    
    // Mocked Function Fetch to simulate API fetch action
    const fetchRecipeId = jest.fn(() => "633338")

    test('INTEGRATOIN TEST 01. Spoonacular Mocked API. Create a recipe query and queries a mocked API as expected.', () => {
        // Create a recipe query
        var expectedString = ""
        var toBeValue = ""
        const recipeId = "633338"
        const recipeApiQuery = spoonacular.createRecipeApiQuery(recipeId)
        const apiKey = getApiKeyFromString(recipeApiQuery,62,94)
        console.log("apiKey: ", apiKey)
        if (apiKeys.includes(apiKey)){
            expectedString = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey  + "&includeNutrition=true"
            console.log("expectedString: ", expectedString)
        }
        
        // Query a mocked API via fetchRecipeId()
        if (expectedString == recipeApiQuery){
            toBeValue = fetchRecipeId(expectedString)
            expect(recipeId).toBe(toBeValue);
        }
        
    })

})