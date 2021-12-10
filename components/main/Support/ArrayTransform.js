import { getFirestore, getDoc, getDocs, doc, updateDoc, collection, query, where } from "firebase/firestore";

// Firestore database class
export default class ArrayTransform{

    /*
    Method description: turns the first string paramater into an array of objects. Also, turns the second string parameter into an attribute of the objects contained in the array returned.
    Method parameters:
        * stringValue is a string that contains string values separated by commas. 
        * toggleString is a string that contains string values separated by commas.
    Method return: an array of objects with the following attributes:
        * id: number
        * name: taken from the stringValue string
        * toggle: derived from the string toggleString string. Derived means that some logic is applied to it in order to derive the value of this attribute 
    */
    async stringToArray(stringValue, toggleString){
        try{
            var arrayValue = []
            var tmpArray = []
            if(stringValue != undefined){
                tmpArray = stringValue.split(",") // tmpArray contains each individual value from stringValue parameter.
            }
            var tmpToggleArray = []
            if(toggleString != undefined){
                tmpToggleArray = toggleString.split(",") //tmpToggleArray contains the values of arrayValue that has to have toggle attribute set to true
            }
            var i=1
            var toggleValue 

            //console.log("String to convert into an array:", stringValue)
            //console.log("String that defines toggle attribute:", toggleString)
            
            for(const element of tmpArray){
                //console.log(i, ". Element to push into the array: ", element)
                toggleValue = false

                // if an element from tmpToggleArray is equal to the element of tmpArray, then toggleValue is true
                toggleValue = await this.setToggleValue(tmpToggleArray, element)
                //console.log(i, "Element of the array to be pushed: ", element)
                arrayValue = await this.pushArrayValue(arrayValue, i, element, toggleValue)
                i++
            }

            //console.log("Counter final value from the stringToArray method:", i)
            //console.log("Array to print in the settings is: ", arrayValue)
            
            return arrayValue
        }catch(e){
            //console.log(e)
            return []
        }
    }

    async setToggleValue(tmpToggleArray, element){
        var toggleValue = false
        //console.log("Element that will defines the toggle value: ", element, ". Value before setting it is ", toggleValue)
        for(const elementTmpToggle of tmpToggleArray){
            if (elementTmpToggle != undefined && elementTmpToggle == element) {
                toggleValue = true
                //console.log("Element that defines the toggle value: ", element, ". Value after setting it is ", toggleValue)
            }
        }
        return toggleValue
    }

    async pushArrayValue(arrayValue, i, element, toggleValue){
        var elementOfArray = {id:null, name:null, toggle:null}
        if (element != undefined){
            elementOfArray.id = i
            elementOfArray.name = element
            elementOfArray.toggle = toggleValue
            if (elementOfArray != undefined){
                arrayValue.push(elementOfArray)
            }
        }
        return arrayValue
    }

}