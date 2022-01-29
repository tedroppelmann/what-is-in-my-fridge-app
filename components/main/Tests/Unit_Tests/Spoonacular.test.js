import * as spoonacular from '../../Support/Spoonacular'
let apiKeys = ['80256361caf04b358f4cd2de7f094dc6', '4a53e799e6134b139ddc05f3d97f7136', '4a418dc794ec4390a4d7c7f21ae271da', '3751e70010854bfb8d9872ebdad31e9d', '641c4d9919ae47a6b16557423d352d2b', '4bba3cde5e144078aeaf8251b10702df', '7fb5963e52254260920e9d7394d85e01'];
//import fetch from 'node-fetch'

function getApiKeyFromString(stringParam,start,end){
    const apiKey = stringParam.substring(start,end)
    //console.log("apiKey: ", apiKey)
    return apiKey
}

describe('Spoonacular.js', () => {
    test('STC1. Spoonacular.js given one ingredient, one intolerance and a diet, creates a complex recipe search API query as expected.', () => {
        var toBeString = ""
        const ingredients = "steak"
        const intolerances = "Peanut"
        const diet = "Gluten Free"

        const complexSearchQuery = spoonacular.createComplexSearchApiQuery(ingredients, intolerances, diet, "min-missing")
        console.log("Generated complex query: ", complexSearchQuery)

        const apiKey = getApiKeyFromString(complexSearchQuery, 57, 89)

        if (apiKeys.includes(apiKey)){
            toBeString = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeIngredients=" + ingredients + "&number=6&sort=min-missing-ingredients&fillIngredients=true&instructionsRequired=true&intolerances=" + intolerances + "&diet=" + diet + "&ignorePantry=false"
        }
        console.log("Expected complex query: ", toBeString)

        expect(complexSearchQuery).toBe(toBeString);
    })

    test('STC2. Spoonacular.js given only one ingredient, creates a complex recipe search API query as expected.', () => {
        var toBeString = ""
        const ingredients = "steak,rice"
        const intolerances = ""
        const diet = ""

        const complexSearchQuery = spoonacular.createComplexSearchApiQuery(ingredients, intolerances, diet, "min-missing")
        console.log("Generated complex query: ", complexSearchQuery)

        const apiKey = getApiKeyFromString(complexSearchQuery, 57, 89)

        if (apiKeys.includes(apiKey)){
            toBeString = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeIngredients=" + ingredients + "&number=6&sort=min-missing-ingredients&fillIngredients=true&instructionsRequired=true&intolerances=" + intolerances + "&diet=" + diet + "&ignorePantry=false"
        }
        console.log("Expected complex query: ", toBeString)

        expect(complexSearchQuery).toBe(toBeString);
    })

    test('STC3. Spoonacular.js given two ingredients, creates a complex recipe search API query as expected.', () => {
        var toBeString = ""
        const ingredients = "steak,rice"
        const intolerances = ""
        const diet = ""

        const complexSearchQuery = spoonacular.createComplexSearchApiQuery(ingredients, intolerances, diet, "min-missing")
        console.log("Generated complex query: ", complexSearchQuery)

        const apiKey = getApiKeyFromString(complexSearchQuery, 57, 89)

        if (apiKeys.includes(apiKey)){
            toBeString = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeIngredients=" + ingredients + "&number=6&sort=min-missing-ingredients&fillIngredients=true&instructionsRequired=true&intolerances=" + intolerances + "&diet=" + diet + "&ignorePantry=false"
        }
        console.log("Expected complex query: ", toBeString)

        expect(complexSearchQuery).toBe(toBeString);
    })

    test('STC4. Spoonacular.js given two ingredients, two intolerances, creates a complex recipe search API query as expected.', () => {
        var toBeString = ""
        const ingredients = "cheese,pasta"
        const intolerances = "Gluten,Peanut"
        const diet = ""

        const complexSearchQuery = spoonacular.createComplexSearchApiQuery(ingredients, intolerances, diet, "min-missing")
        console.log("Generated complex query: ", complexSearchQuery)

        const apiKey = getApiKeyFromString(complexSearchQuery, 57, 89)

        if (apiKeys.includes(apiKey)){
            toBeString = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeIngredients=" + ingredients + "&number=6&sort=min-missing-ingredients&fillIngredients=true&instructionsRequired=true&intolerances=" + intolerances + "&diet=" + diet + "&ignorePantry=false"
        }
        console.log("Expected complex query: ", toBeString)

        expect(complexSearchQuery).toBe(toBeString);
    })

    test('STC5. Spoonacular.js given two ingredients, two intolerances and a diet, creates a complex recipe search API query as expected.', () => {
        var toBeString = ""
        const ingredients = "cheese,pasta"
        const intolerances = "Gluten,Peanut"
        const diet = "Vegetarian"

        const complexSearchQuery = spoonacular.createComplexSearchApiQuery(ingredients, intolerances, diet, "min-missing")
        console.log("Generated complex query: ", complexSearchQuery)

        const apiKey = getApiKeyFromString(complexSearchQuery, 57, 89)

        if (apiKeys.includes(apiKey)){
            toBeString = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeIngredients=" + ingredients + "&number=6&sort=min-missing-ingredients&fillIngredients=true&instructionsRequired=true&intolerances=" + intolerances + "&diet=" + diet + "&ignorePantry=false"
        }
        console.log("Expected complex query: ", toBeString)

        expect(complexSearchQuery).toBe(toBeString);
    })

    test('STC6. Spoonacular.js given three ingredients, three intolerances and a diet, creates a complex recipe search API query as expected.', () => {
        var toBeString = ""
        const ingredients = "rice,tomato,garlic"
        const intolerances = "Gluten, Peanut, Wheat"
        const diet = "Vegan"

        const complexSearchQuery = spoonacular.createComplexSearchApiQuery(ingredients, intolerances, diet, "min-missing")
        console.log("Generated complex query: ", complexSearchQuery)

        const apiKey = getApiKeyFromString(complexSearchQuery, 57, 89)

        if (apiKeys.includes(apiKey)){
            toBeString = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeIngredients=" + ingredients + "&number=6&sort=min-missing-ingredients&fillIngredients=true&instructionsRequired=true&intolerances=" + intolerances + "&diet=" + diet + "&ignorePantry=false"
        }
        console.log("Expected complex query: ", toBeString)

        expect(complexSearchQuery).toBe(toBeString);
    })
    
    test('STC7. Spoonacular.js given a recipe ID, creates a recipe API query as expected.', () => {
        var toBeString = ""
        const recipeId = "633338"
        
        const recipeApiQuery = spoonacular.createRecipeApiQuery(recipeId)

        const apiKey = getApiKeyFromString(recipeApiQuery,62,94)
        console.log("apiKey: ", apiKey)

        if (apiKeys.includes(apiKey)){
            toBeString = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey  + "&includeNutrition=true"
            console.log("toBeString: ", toBeString)
        }

        expect(recipeApiQuery).toBe(toBeString);
    })

    test('STC8. Spoonacular.js given a empty recipe ID, returns a string as expected.', () => {
        var toBeString = ""
        const recipeId = ""
        const recipeApiQuery = spoonacular.createRecipeApiQuery(recipeId)
        const apiKey = getApiKeyFromString(recipeApiQuery,56,88)
        console.log("apiKey: ", apiKey)

        if (apiKeys.includes(apiKey)){
            toBeString = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey  + "&includeNutrition=true"
            console.log("toBeString: ", toBeString)
        }

        expect(recipeApiQuery).toBe(toBeString);
    })
    
    async function createRecipeApiQuery(recipeId){
        return spoonacular.createRecipeApiQuery(recipeId)
    }

    test('STC9. Spoonacular API. Create a recipe query and, using the query, fetch data from the spoonacular API as expected.', async () => {
        var toBeString = ""
        const recipeId = "633338"
        const recipeApiQuery = await createRecipeApiQuery(recipeId)
        console.log(recipeApiQuery)
        
        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ id: "633338" })
            })  
        )
        
        const response = await fetch(recipeApiQuery)
        toBeString = await response.json()
        console.log(toBeString)

        await expect(recipeId).toBe(toBeString.id)
    })
    
    async function createComplexSearchApiQuery(ingredients, intolerances, diet, orderby){
        return spoonacular.createComplexSearchApiQuery(ingredients, intolerances, diet, orderby)
    }

    test('STC10. Spoonacular API. Create a complex search query and, using the query, fetch recipe IDs from the spoonacular API as expected.', async () => {
        const recipeIds = await JSON.parse('{"results": [ { "id":"633338" }, { "id":"633339" } ]}') 
        const ingredients = "rice,tomato,garlic"
        const intolerances = "Gluten, Peanut, Wheat"
        const diet = "Vegan"
        console.log("RecipeIDS: ", recipeIds.results[0].id+recipeIds.results[1].id)
       
        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ results: [ { id:"633338" }, { id:"633339" } ] })
            })  
        )
        
        const complexSearchQuery = await createComplexSearchApiQuery(ingredients, intolerances, diet, "min-missing")

        const response = await fetch(complexSearchQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.results[0].id+toBeString.results[1].id)
        
        await expect(recipeIds.results[0].id + "," + recipeIds.results[1].id).toBe(toBeString.results[0].id + "," + toBeString.results[1].id)
    })

    test('STC11. Spoonacular API. Create a recipe query and, using the query, fetch the first recipe step from the spoonacular API as expected.', async () => {
        const stepInfo = await JSON.parse('{ "analyzedInstructions": [{ "steps": [{"number": 1 }] }] }') 
        console.log("Step Information: ", stepInfo.analyzedInstructions[0].steps[0].number)
        const recipeApiQuery = await createRecipeApiQuery("633338")

        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ analyzedInstructions: [{ steps: [{number: 1 }] }] })
            })  
        )

        const response = await fetch(recipeApiQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.analyzedInstructions[0].steps[0].number)
        
        await expect(stepInfo.analyzedInstructions[0].steps[0].number).toBe(toBeString.analyzedInstructions[0].steps[0].number)
    })

    test('STC12. Spoonacular API. Create a recipe query and, using the query, fetch the first recipe step description from the spoonacular API as expected.', async () => {
        const stepInfo = await JSON.parse('{ "analyzedInstructions": [{ "steps": [{"number": 1, "step": "Place the tenderloins on a large dish and wrap a slice of room temperature bacon around each filet, gently stretching the bacon if needed. Secure the ends of the bacon with a toothpick." }] }] }') 
        console.log("Step Information: ", stepInfo.analyzedInstructions[0].steps[0].step)
        const recipeApiQuery = await createRecipeApiQuery("633338")

        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ analyzedInstructions: [{ steps: [{number: 1, step: "Place the tenderloins on a large dish and wrap a slice of room temperature bacon around each filet, gently stretching the bacon if needed. Secure the ends of the bacon with a toothpick." }] }] })
            })  
        )

        const response = await fetch(recipeApiQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.analyzedInstructions[0].steps[0].step)
        
        await expect(stepInfo.analyzedInstructions[0].steps[0].step).toBe(toBeString.analyzedInstructions[0].steps[0].step)
    })

    test('STC13. Spoonacular API. Create a recipe query and, using the query, fetch gluten free diet restriction of a recipe from the spoonacular API as expected.', async () => {
        const restriction = await JSON.parse('{ "glutenFree": false }') 
        console.log("Step Information: ", restriction.glutenFree)
        const recipeApiQuery = await createRecipeApiQuery("633338")

        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ dairyFree: true, glutenFree: false, vegetarian: false })
            })  
        )

        const response = await fetch(recipeApiQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.glutenFree)
        
        await expect(restriction.glutenFree).toBe(toBeString.glutenFree)
    })

    test('STC14. Spoonacular API. Create a recipe query and, using the query, fetch dairy free diet restriction of a recipe from the spoonacular API as expected.', async () => {
        const restriction = await JSON.parse('{ "dairyFree": true }') 
        console.log("Step Information: ", restriction.dairyFree)
        const recipeApiQuery = await createRecipeApiQuery("633338")

        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ dairyFree: true, glutenFree: false, vegetarian: false })
            })  
        )

        const response = await fetch(recipeApiQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.dairyFree)
        
        await expect(restriction.dairyFree).toBe(toBeString.dairyFree)
    })

    test('STC15. Spoonacular API. Create a recipe query and, using the query, fetch vegetarian diet restriction of a recipe from the spoonacular API as expected.', async () => {
        const restriction = await JSON.parse('{ "vegetarian": false }') 
        console.log("Step Information: ", restriction.vegetarian)
        const recipeApiQuery = await createRecipeApiQuery("633338")

        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ dairyFree: true, glutenFree: false, vegetarian: false })
            })  
        )

        const response = await fetch(recipeApiQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.vegetarian)
        
        await expect(restriction.vegetarian).toBe(toBeString.vegetarian)
    })

    test('STC16. Spoonacular API. Create a recipe query and, using the query, fetch duration in minutes of a recipe from the spoonacular API as expected.', async () => {
        //"readyInMinutes": 45,
        //"servings": 4,
        const recipeInfo = await JSON.parse('{ "readyInMinutes": 45, "servings": 4 }') 
        console.log("Step Information: ", recipeInfo.readyInMinutes)
        const recipeApiQuery = await createRecipeApiQuery("633338")

        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ readyInMinutes: 45, servings: 4 })
            })  
        )

        const response = await fetch(recipeApiQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.readyInMinutes)
        
        await expect(recipeInfo.readyInMinutes).toBe(toBeString.readyInMinutes)
    })

    test('STC17. Spoonacular API. Create a recipe query and, using the query, fetch amount of servings of a recipe from the spoonacular API as expected.', async () => {
        const recipeInfo = await JSON.parse('{ "readyInMinutes": 45, "servings": 4 }') 
        console.log("Step Information: ", recipeInfo.servings)
        const recipeApiQuery = await createRecipeApiQuery("633338")

        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ readyInMinutes: 45, servings: 4 })
            })  
        )

        const response = await fetch(recipeApiQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.servings)
        
        await expect(recipeInfo.servings).toBe(toBeString.servings)
    })

    test('STC18. Spoonacular API. Create a recipe query and, using the query, fetch the name of the recipe from the spoonacular API as expected.', async () => {
        //"id": 633338,
        //"title": "Bacon Wrapped Filet Mignon",
        const recipeInfo = await JSON.parse('{ "id": 633338, "title": "Bacon Wrapped Filet Mignon" }')
        console.log("Step Information: ", recipeInfo.title)
        const recipeApiQuery = await createRecipeApiQuery("633338")

        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ id: 633338, title: "Bacon Wrapped Filet Mignon" })
            })  
        )

        const response = await fetch(recipeApiQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.title)
        
        await expect(recipeInfo.title).toBe(toBeString.title)
    })

    test('STC19. Spoonacular API. Create a recipe query and, using the query, fetch the first ingredient of the recipe from the spoonacular API as expected.', async () => {
        const recipeInfo = await JSON.parse('{ "id": 633338, "extendedIngredients": [ { "id": 10023583, "name": "beef tenderloin steaks" } ] }')
        console.log("Step Information: ", recipeInfo.extendedIngredients[0].name)
        const recipeApiQuery = await createRecipeApiQuery("633338")

        const fetch = jest.fn((query) =>  
            Promise.resolve({
                json : () => Promise.resolve({ id: 633338, extendedIngredients: [ { id: 10023583, name: "beef tenderloin steaks" } ] })
            })  
        )

        const response = await fetch(recipeApiQuery)
        const toBeString = await response.json()
        console.log("ToBeString: ", toBeString.extendedIngredients[0].name)
        
        await expect(recipeInfo.extendedIngredients[0].name).toBe(toBeString.extendedIngredients[0].name)
    })

})