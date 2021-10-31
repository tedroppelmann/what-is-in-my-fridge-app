import { USER_STATE_CHANGE } from "../constants/index";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { getAuth }  from 'firebase/auth'


export function fetchUser() {
    const db = getFirestore();
    return ((dispatch) => {
        getDoc(doc(db, 'Users', getAuth().currentUser.uid))
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else {
                    console.log('does not exists :(')
                }
            })
    })
}