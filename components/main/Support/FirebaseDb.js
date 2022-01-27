import { getFirestore, getDoc, setDoc, getDocs, doc, updateDoc, collection, query, where } from "firebase/firestore";

// Firestore database class
export default class FirebaseDb{

    /*
    Method Description: Instantiate a Firebase database (not a collection)
    Method returns: a firestore database connection
    */
    async initFirestoreDb(){
        const fdb = getFirestore()
        return fdb
    }

    /*
    Method Description: Instantiate a Firebase database (not a collection) given an initialized firestore app. 
                        NOTE: Used during automated testing with JEST tool.
    Method returns: a firestore database connection
    */
    async initFirestoreDb(app){
        const fdb = getFirestore(app)
        return fdb
    }

    /*
    Method description: Query a document from an already initialized firestore database with the method initFirestoreDb()
    Method parameters:
        * fdb is an initialized firebase database
        * dbName is a string with the name of the firebase database
        * docId is a string with the ID of the document that will be queried
    Method returns: all fields of a queried document
    */
    async queryDocFromFdb(fdb, dbName, docId){
        try{
            const docRef = doc(fdb, dbName, docId);
            const docSnap = await getDoc(docRef);
            /*
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }*/
            return docSnap.data()
        }catch(e){
            console.log(e)
            return null
        }
    }

    /*
    Method description: Update a document on an already initialized firestore database with the method initFirestoreDb()
    Method parameters:
        * fdb is an initialized firebase database
        * dbName is a string with the name of the firebase database
        * docId is a string with the ID of the document that will be queried in the database (dbName)
        * field is a string defining the docId field that will be updated to the document id (docId)
        * value is a string containing the new value that will be assigned to the field 
    Method returns: true if document was updated succesfully. false otherwise.
    */
    async updateRegistryDb(fdb, docId, dbName, field, value){
        try{
            if (docId != "") {
                //Insert Diet for logged in user
                const docResult = doc(fdb, dbName, docId);
                await updateDoc(docResult, { [`${field}`]: value }); // { fieldOnFirestore : reactVariable } // Utilizar setDoc y agregar los campos nuevos con sus valores
                //console.log("Document updated: ", docId);
                return true
            } else {
                //doc.data() will be undefined in this case
                console.log("Empty Document ID. Update was not performed.");
                return false
            }
        }catch(e){
            console.log(e)
            return false
        }
    }

    /*
    Method description: Insert a document on an already initialized firestore database with the method initFirestoreDb()
    Method parameters:
        * fdb is an initialized firebase database
        * dbName is a string with the name of the firebase database
        * docId is a string with the ID of the document that will be queried in the database (dbName)
        * field is a string defining the docId field that will be updated to the document id (docId)
        * value is a string containing the new value that will be assigned to the field 
    Method returns: true if document was updated succesfully. false otherwise.
    */
    async insertNewUserDb(fdb, docId, dbName, name, email){
        try{
            if (docId != "") {
                //Insert Diet for logged in user
                //const docResult = ;
                
                await setDoc(doc(fdb, dbName, docId), {
                    name: name,
                    email: email,
                    favorites: [],
                  });
                
                //await updateDoc(docResult, { [`${field}`]: value }); // { fieldOnFirestore : reactVariable } // Utilizar setDoc y agregar los campos nuevos con sus valores
                console.log("Document inserted: ", docId);
                return true
            } else {
                //doc.data() will be undefined in this case
                console.log("Empty Document ID. Insert was not performed.");
                return false
            }
        }catch(e){
            console.log(e)
            return false
        }
    }

    /*
    (Not used)
    Method Description: Instantiate a Firebase database collection with the database name passed on the parameters
    Method parameters: 
        * dbName is a string with the name of the collection from a Firestore NoSQL database
    Method returns: a firestore collection
    */
    async initCollectionDb(dbName){
        const fdb = getFirestore()
        const collectionFromDb = collection(fdb, dbName)
        return collectionFromDb
    }
    
    /*
    (Not used)
    Method Description: Query an ID from an already initialized collection. Returns the ID of a document.
    Mathod parameters:
        * collectionFromDb is a collection created from a Firestore NoSQL database with the method initCollectionDb(dbName)
        * field is a string. i.e. "email", "name", ...
        * relation is a string. i.e. "==", "!=", ...
        * filter is a string. i.e. if field is "email", then filter could be "abc@abc.com"
    Method Returns: A string with the ID of a document that belongs to a collection. 
    */
    async queryIdFromCollectionFdb(collectionFromDb, field, relation, filter){
        try{
            const queryResult = query(collectionFromDb, where(field, relation, filter))
            const querySnapshot = await getDocs(queryResult)
            var docId = null
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data())
                docId = doc.id // You should validate if there are other docIDs and if there are more than one, throw an error. 
            });

            return docId
        }catch(e){
            //console.log(e)
        }
    }

}