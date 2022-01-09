let apiKey1 = ['80256361caf04b358f4cd2de7f094dc6', 0];
let apiKey2 = ['4a53e799e6134b139ddc05f3d97f7136', 0];
let apiKey3 = ['4a418dc794ec4390a4d7c7f21ae271da', 0];
let apiKey4 = ['3751e70010854bfb8d9872ebdad31e9d', 0];
let apiKey5 = ['641c4d9919ae47a6b16557423d352d2b', 0];
let apiKey6 = ['4bba3cde5e144078aeaf8251b10702df', 0];
let apiKey7 = ['7fb5963e52254260920e9d7394d85e01', 0];

export function createComplexSearchApiQuery (ing, intoleranceRestriction, dietRestriction, sortBy) {

    var keys = [apiKey1, apiKey2, apiKey3, apiKey4, apiKey5, apiKey6, apiKey7];
    keys.sort(function(x,y){return x[1] - y[1];});
    console.log(keys);

    const endpoint = 'https://api.spoonacular.com/recipes/complexSearch';
    const apiKey = '?apiKey=' + keys[0][0];
    const ingredients = '&includeIngredients=' + ing ;
    const number = '&number=6';
    const sort = '&sort=' + sortBy + '-ingredients';
    const fill_ingredients = '&fillIngredients=true';
    const instructions = '&instructionsRequired=true';
    const intolerance = '&intolerances=' + intoleranceRestriction;
    const dietary = '&diet=' + dietRestriction;
    const ingore_pantry = '&ignorePantry=false';

    const query = endpoint + apiKey + ingredients + number + sort + fill_ingredients + instructions + intolerance + dietary + ingore_pantry;
    
    keys[0][1] += 1;

    return query;
}

export function createRecipeApiQuery (recipe_id) {

    var keys = [apiKey1, apiKey2, apiKey3, apiKey4, apiKey5, apiKey6, apiKey7];
    keys.sort(function(x,y){return x[1] - y[1];});
    console.log(keys);

    const endpoint = 'https://api.spoonacular.com/recipes/' + recipe_id + '/information';
    const apiKey = '?apiKey=' + keys[0][0];
    const nutrition = '&includeNutrition=true'

    const query = endpoint + apiKey + nutrition;

    keys[0][1] += 1;

    return query;
}
