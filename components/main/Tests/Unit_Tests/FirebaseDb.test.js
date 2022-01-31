import FirebaseDb from '../../Support/FirebaseDb'
import { initializeApp } from 'firebase/app';
import { arrayUnion, arrayRemove } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDit6k1tOCrdsXQudPATUdQytB-LryhE10",
    authDomain: "mobile-app-dev-b6760.firebaseapp.com",
    projectId: "mobile-app-dev-b6760",
    storageBucket: "mobile-app-dev-b6760.appspot.com",
    messagingSenderId: "727645352873",
    appId: "1:727645352873:web:b13fae7f75dd0be97a4ab8",
    measurementId: "G-X3BSQKSRTP"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

describe('FirebaseDb.js', () => {
    test('FTC1. FirebaseDb.js given an userId queries a user document as expected.', async () => {
        var toBeString = ""
        const expectString = "mellon1786@gmail.com"
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.queryDocFromFdb(initFdb, "Users", userId)

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString.email)

        await expect(expectString).toBe(toBeString.email)
    })

    test('FTC2. FirebaseDb.js inserts an empty diet in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "diets", "")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC3. FirebaseDb.js inserts a diet in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "diets", "Gluten Free")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC4. FirebaseDb.js updates a diet in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "diets", "Vegan")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC5. FirebaseDb.js updates a diet (with an empty string) in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "diets", "")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC6. FirebaseDb.js inserts an empty intolerance in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "intolerances", "")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC7. FirebaseDb.js inserts one intolerance in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "intolerances", "Peanut")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC8. FirebaseDb.js updates intolerance field with two intolerances in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "intolerances", "Dairy,Egg")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC9. FirebaseDb.js updates intolerance field with three intolerances in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "intolerances", "Dairy,Egg,Peanut")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC10. FirebaseDb.js updates intolerance field with an empty intolerance in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "intolerances", "")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC11. FirebaseDb.js inserts a new user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "YKs93qVHuLXZ1PaDFQQ1FVynX6r2" 
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.insertNewUserDb(initFdb, userId, "Users", "Test", "test@test1.co")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC12. FirebaseDb.js given an restriction document id, queries all the existing diets as expected.', async () => {
        var toBeString = ""
        const expectString = "Gluten Free,Ketogenic,Lacto-Vegetarian,Low FODMAP,Ovo-Vegetarian,Paleo,Pescetarian,Primal,Vegan,Vegetarian,Whole30"
        const restrictionId = "diets"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.queryDocFromFdb(initFdb, "Restrictions", restrictionId)

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString.diets)

        await expect(expectString).toBe(toBeString.diets)
    })

    test('FTC13. FirebaseDb.js given an restriction document id, queries all the existing intolerances as expected.', async () => {
        var toBeString = ""
        const expectString = "Dairy,Egg,Gluten,Grain,Peanut,Seafood,Sesame,Shellfish,Soy,Sulfite,Tree Nut,Wheat"
        const restrictionId = "intolerances"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.queryDocFromFdb(initFdb, "Restrictions", restrictionId)

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString.intolerances)

        await expect(expectString).toBe(toBeString.intolerances)
    })




    test('FTC14. FirebaseDb.js given a document id, deletes a favorite recipe as expected.', async () => {
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1" 
        const recipe_id = 633338
        
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        const toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "favorites", arrayRemove({recipe_id}))

        console.log("Expected: ", expectString, ". To Be: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC15. FirebaseDb.js given a document id, deletes a second favorite recipe as expected.', async () => {
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1" 
        
        const recipe_id2 = 642303
        
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        
        const toBeString2 = await fdb.updateRegistryDb(initFdb, userId, "Users", "favorites", arrayRemove({recipe_id2}))

        console.log("Expected: ", expectString, ". To Be: ", toBeString2)

        await expect(expectString).toBe(toBeString2)
    })

    test('FTC16. FirebaseDb.js given a document id, deletes a third favorite recipe as expected.', async () => {
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1" 

        const recipe_id3 = 642825
        
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)

        const toBeString3 = await fdb.updateRegistryDb(initFdb, userId, "Users", "favorites", arrayRemove({recipe_id3}))

        console.log("Expected: ", expectString, ". To Be: ", toBeString3)

        await expect(expectString).toBe(toBeString3)
    })

    test('FTC17. FirebaseDb.js given a document id, inserts one favorite recipe as expected.', async () => {
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1" 
        const recipe_id = 633338
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        const toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "favorites", arrayUnion({recipe_id}))

        console.log("Expected: ", expectString, ". To Be: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC18. FirebaseDb.js given a document id, inserts a second favorite recipe as expected.', async () => {
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1" 
        const recipe_id = 642825
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        const toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "favorites", arrayUnion({recipe_id}))

        console.log("Expected: ", expectString, ". To Be: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC19. FirebaseDb.js given a document id, inserts a third favorite recipe as expected.', async () => {
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1" 
        const recipe_id = 642303
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        const toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "favorites", arrayUnion({recipe_id}))

        console.log("Expected: ", expectString, ". To Be: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC20. FirebaseDb.js given a document id, queries one favorite recipe as expected.', async () => {
        var toBeString = ""
        const expectString = 642825
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1" 
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.queryDocFromFdb(initFdb, "Users", userId)

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString.favorites[0].recipe_id)

        await expect(expectString).toBe(toBeString.favorites[0].recipe_id)
    })

    test('FTC21. FirebaseDb.js given a document id, queries two favorite recipes as expected.', async () => {
        var toBeString = ""
        const expectString = "642825" + "," + "642303"
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1" 
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.queryDocFromFdb(initFdb, "Users", userId)

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString.favorites[0].recipe_id + "," + toBeString.favorites[1].recipe_id)

        await expect(expectString).toBe(toBeString.favorites[0].recipe_id + "," + toBeString.favorites[1].recipe_id)
    })

    test('FTC22. FirebaseDb.js given a document id, queries three favorite recipes as expected.', async () => {
        var toBeString = ""
        const expectString = "642825" + "," + "642303" + "," + "633338";
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1" 
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.queryDocFromFdb(initFdb, "Users", userId)

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString.favorites[0].recipe_id + "," + toBeString.favorites[1].recipe_id + "," + toBeString.favorites[2].recipe_id)

        await expect(expectString).toBe(toBeString.favorites[0].recipe_id + "," + toBeString.favorites[1].recipe_id + "," + toBeString.favorites[2].recipe_id)
    })

    test('FTC23. FirebaseDb.js updates a diet field, with a different diet, in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "diets", "Vegetarian")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC24. FirebaseDb.js given an userId queries a user diet restriction as expected.', async () => {   
        const expectString = "Vegetarian"
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        const toBeString = await fdb.queryDocFromFdb(initFdb, "Users", userId)

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString.diets)

        await expect(expectString).toBe(toBeString.diets)
    })

    test('FTC25. FirebaseDb.js inserts three intolerances in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "intolerances", "Peanut,Dairy,Egg")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC26. FirebaseDb.js given an userId queries all user intolerances as expected.', async () => {
        const expectString = "Peanut,Dairy,Egg"
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        const toBeString = await fdb.queryDocFromFdb(initFdb, "Users", userId)

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString.intolerances)

        await expect(expectString).toBe(toBeString.intolerances)
    })

})