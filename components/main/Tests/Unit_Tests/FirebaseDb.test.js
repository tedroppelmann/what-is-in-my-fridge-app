import FirebaseDb from '../../Support/FirebaseDb'
import { initializeApp } from 'firebase/app';

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

    test('FTC8. FirebaseDb.js updates intolerance field with three intolerances in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "intolerances", "Dairy,Egg,Peanut")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC9. FirebaseDb.js updates intolerance field with an empty intolerance in a user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.updateRegistryDb(initFdb, userId, "Users", "intolerances", "")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

    test('FTC10. FirebaseDb.js inserts a new user document as expected.', async () => {
        var toBeString = false
        const expectString = true
        const userId = "YKs93qVHuLXZ1PaDFQQ1FVynX6r2" 
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb(app)
        toBeString = await fdb.insertNewUserDb(initFdb, userId, "Users", "Test", "test@test1.co")

        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        await expect(expectString).toBe(toBeString)
    })

})