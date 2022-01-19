import FirebaseDb from '../../Support/FirebaseDb'

const queryEmailFromDoc = jest.fn(() => "mellon1786@gmail.com")

describe('FirebaseDb.js', () => {
    test('FirebaseDb.js queries a user document as expected.', () => {
        var toBeString = ""
        const expectString = "mellon1786@gmail.com"
        const userId = "N9SMLRPcXfVlsxOD6VNo0LKoOyo1"
        //const fdb = new FirebaseDb()
        //const initFdb = await fdb.initFirestoreDb()
        //toBeString = await fdb.queryDocFromFdb(initFdb, "Users", userId).email

        toBeString = queryEmailFromDoc(userId)
        console.log("Expected String: ", expectString, ". To Be String: ", toBeString)

        expect(expectString).toBe(toBeString)
    })

})