let apiKey1 = ['80256361caf04b358f4cd2de7f094dc6', 0];
let apiKey2 = ['4a53e799e6134b139ddc05f3d97f7136', 0];
let apiKey3 = ['4a418dc794ec4390a4d7c7f21ae271da', 0];
let apiKey4 = ['3751e70010854bfb8d9872ebdad31e9d', 0];
let apiKey5 = ['641c4d9919ae47a6b16557423d352d2b', 0];
let apiKey6 = ['4bba3cde5e144078aeaf8251b10702df', 0];
let apiKey7 = ['7fb5963e52254260920e9d7394d85e01', 0];

/*
    Description: Creates a string with a complex recipe search API query
    Parameters:
        * ing is a string containing ingredients separated by commas
        * intoleranceRestriction is a string containing intolerances separated by commas
        * dietRestriction is a string with the diet restriction
        * sortBy is a string that can have assigned either 'min-missing' or 'max-used' as values
    Returns: a string with a complex search spoonacular API query
*/
export function createComplexSearchApiQuery (ing, intoleranceRestriction, dietRestriction, sortBy) {

    var keys = [apiKey1, apiKey2, apiKey3, apiKey4, apiKey5, apiKey6, apiKey7];
    keys.sort(function(x,y){return x[1] - y[1];});
    //console.log(keys);

    const endpoint = 'https://api.spoonacular.com/recipes/complexSearch';
    const apiKey = '?apiKey=' + keys[0][0];
    const ingredients = '&includeIngredients=' + ing ;
    const number = '&number=10';
    const sort = '&sort=' + sortBy + '-ingredients';
    const fill_ingredients = '&fillIngredients=true';
    const instructions = '&instructionsRequired=true';
    const intolerance = '&intolerances=' + intoleranceRestriction;
    const dietary = '&diet=' + dietRestriction;
    const ingore_pantry = '&ignorePantry=false';

    const query = endpoint + apiKey + ingredients + number + sort + fill_ingredients + instructions + intolerance + dietary + ingore_pantry;
    //console.log("createComplexSearchApiQuery api Key: ", query.substring(57,89))

    keys[0][1] += 1;

    return query;
}

/*
    Description: Creates a string with a single recipe API query
    Parameters:
        * recipe_id is a string containing the Spoonacular ID of a recipe
    Returns: an object containing all data of a recipe. The object returned has attributes like: id, vegetarian, glutenfree, analyzedInstructions. These can be accesed as follows: object.<attribute> (i.e. recipe.id, recipe.analyzedInstructions, etc.)
*/
export function createRecipeApiQuery (recipe_id) {

    var keys = [apiKey1, apiKey2, apiKey3, apiKey4, apiKey5, apiKey6, apiKey7];
    keys.sort(function(x,y){return x[1] - y[1];});
    //console.log(keys);

    const endpoint = 'https://api.spoonacular.com/recipes/' + recipe_id + '/information';
    const apiKey = '?apiKey=' + keys[0][0];
    const nutrition = '&includeNutrition=true'

    const query = endpoint + apiKey + nutrition;
    //console.log("createRecipeApiQuery: ", query)

    keys[0][1] += 1;

    return query;
}