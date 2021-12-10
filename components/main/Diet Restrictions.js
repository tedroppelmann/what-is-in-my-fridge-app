import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { NativeBaseProvider, View, Switch, Input, Spinner, Button, VStack, Box, Text, ScrollView } from 'native-base'
import { connect } from 'react-redux'
import FirebaseDb from './Support/FirebaseDb'
import ArrayTransform from './Support/ArrayTransform'
import { v4 as uuidv4 } from 'uuid';

export class DietRestrictions extends Component{
    
    /*
    Method description: https://es.reactjs.org/docs/react-component.html#constructor
    */
    constructor(props) {
        super(props);
        this.state = {
            user: props.currentUser, // initialize user attribute with the currentUser from redux
            diets: [], 
            uiIsLoading: true,
            savingDiets: false, 
            searchTerm: "", // this is required for the search input 
        }

        this.saveDietForLoggedUser = this.saveDietForLoggedUser.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
        this.setSearchTerm = this.setSearchTerm.bind(this)
    }

    /*
    Method description: https://es.reactjs.org/docs/react-component.html#componentdidmount
    */
    async componentDidMount(){
        //console.log("componentDidMount diets previous state: ", this.state.diets)        
        var diets = await this.setDietRestrictions()
        // Call an extra render of the UI after the setting of the diet restriction in the previous line
        this.setState({diets: diets})
        //console.log("componentDidMount diets after initialization state", this.state.diets)
    }

    /* 
    Method description: Parse to string the diets selected on the UI and save them on the users collection on firestore
    */
    async identifySelectedDiets(){
        var selectedDiets = [];
        var i=0;
        this.state.diets.forEach(() => {
            if(this.state.diets[i].toggle){
                selectedDiets.push(this.state.diets[i].name);
                //console.log(this.state.diets[i].name," was selected.");
            }else{
                //console.log(this.state.diets[i].name," was not selected.");
            }
            i++;
        })
        var selectedDietsToString = selectedDiets.toString();
        //console.log("Diets parsed to string: ", selectedDietsToString);
        return selectedDietsToString; 
    }

    /*
    Method Description: used on pressed button from UI to save a selected diet restriction from a user into a firestore database 
    */
    async saveDietForLoggedUser(){
        try{
            // In order to show the spinner while the execution of this method, set first savingDiets to true
            this.setState({ savingDiets: true })
            //console.log("Saving Diets? (After update) ", this.state.savingDiets)

            // Create a new object from the class FirebaseDb to be able to query (select, insert and update) the Firestore NoSQL database
            const fdb = new FirebaseDb()
            
            // Instantiate a Firebase database collection with the database name passed on the parameters
            const usersCollectionFdb = await fdb.initCollectionDb("Users")
            //console.log("Initialized users collection")
            
            // Query the ID of a user from an already initialized firestore collection given an email
            const userDocId = await fdb.queryIdFromCollectionFdb(usersCollectionFdb, "email", "==", this.state.user.email)
            //console.log("User document ID obtained", userDocId)
            
            // Identify which diets were selected and create a string separated by commas.
            const diets = await this.identifySelectedDiets()
            //console.log("Diets selected: ", diets)
            
            // Update (or insert if the field diets does not exist) the diets of a specified user in the Users firestore collection
            const initFdb = await fdb.initFirestoreDb()
            const updatedRegistry = await fdb.updateRegistryDb(initFdb, userDocId, "Users", "diets", diets)

            // In order to stop showing the spinner when the execution of this method finishes, set savingDiets to false
            this.setState({ savingDiets: false })
            //console.log("Saving Diets? (After update) ", this.state.savingDiets)

            if (updatedRegistry){ this.showAlert("Diet Restrictions", "Diets Saved Successfully!") } else { this.showAlert("Diet Restrictions", "Diets not saved!") }
        
        }catch(e){
            console.log(e) // An exception could be thrown if there is no connection to Firestore.
            this.showAlert("Diet Restrictions", "Diets not saved!")
        }
    }
    
    /*
    Method Description: initialize an array of objects that contains all diet restrictions that should appear on the UI for the user to select or deselect them. 
    */
    async setDietRestrictions(){
        try{
            // Connect to firebase and query the diets document from the Restrictions collection database 
            const fdb = new FirebaseDb()
            const connFdb = await fdb.initFirestoreDb()
            const field = await fdb.queryDocFromFdb(connFdb, "Restrictions", "diets")
            //console.log("Queried field from a document: ", field.diets)
            
            // Query the diets field from the user document
            const usersCollectionFdb = await fdb.initCollectionDb("Users")
            const userDocId = await fdb.queryIdFromCollectionFdb(usersCollectionFdb, "email", "==", this.state.user.email)
            const field2 = await fdb.queryDocFromFdb(connFdb, "Users", userDocId)
            //console.log("Queried field from a diet document: ", field.diets)
            //console.log("Queried field2 from a user document: ", field2.diets)
            
            // Update the diets state with all a diets object array 
            const arrTrn = new ArrayTransform()
            const stringTurnedIntoArray = await arrTrn.stringToArray(field.diets, field2.diets)
            
            // In order to stop showing the spinner in the UI, if updating diets state finish executing then set uiIsLoading to false  
            //console.log("UI is Loading? ", this.state.uiIsLoading)
            this.setState({ uiIsLoading: false })
            //console.log("UI is Loading (After array transform)? ", this.state.uiIsLoading)
            
            return stringTurnedIntoArray
            
        }catch(e){
            console.log(e)
        }
    }

    toggleSwitch = (i) => (event) => {
        this.setState((state, props) => {
          state.diets[i].toggle = !state.diets[i].toggle;
          //console.log(state.diets[i].name, " toggled.")
          return {
            diets: state.diets
          }
        })
    }

    /* 
    Method description: This method is required for the search input filter
    */
    setSearchTerm(text){
        this.setState((state) => {
            state.searchTerm = text 
            //console.log(state.searchTerm)
            return {
                searchTerm: state.searchTerm 
            }
        })
    }

    showAlert(title, message) {  
        Alert.alert(
            title,
            message,
            [
              {
                text: "Ok",
                //onPress: () => console.log("Ok Pressed"),
                style: "default",
              },
            ],
            {
              cancelable: true,
              //onDismiss: () => console.log("Dismissed alert by tapping outside of the alert dialog")
            }
        )        
    }  
    
    render(){
        const { diets, searchTerm } = this.state
        //console.log("Array of Diets: ", diets)
        const dietJSX = []
        var switchKey=0;
        if (diets != undefined){
            diets.forEach((diet) => {
                if (diet.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm == null || searchTerm == "") {
                    dietJSX.push(
                        <View key={uuidv4()} style={{flexDirection:"row", height:20, marginBottom:50, flex:1}}>
                            <View key={uuidv4()} style={{justifyContent: 'flex-start', flex:1}}>
                                <Text key={uuidv4()} style={{justifyContent: 'flex-start', flex:1}} > {diet.name} </Text>
                            </View>
                            <View key={uuidv4()} style={{justifyContent: 'center', flex:1}}>
                                <Switch
                                    key={switchKey}
                                    style={{justifyContent: 'flex-end', flex:1}}
                                    onToggle={this.toggleSwitch(switchKey)}
                                    isChecked={diet.toggle}
                                />  
                            </View>
                        </View>
                    )
                }
                switchKey++;
            })
        }

        return (
            <NativeBaseProvider>
                <Box safeArea flex={1} p="2" py="4" w="90%" mx="auto">
                    <VStack>
                        <Input 
                            style={styles.filterInfo} 
                            type="text" 
                            placeholder='Search dietary restrictions...' 
                            onChangeText={(text) => this.setSearchTerm(text)}
                        />
                    </VStack>
                    <ScrollView>
                        <VStack style={styles.containerInfoUp}>
                            {this.state.uiIsLoading? <Spinner size="lg" /> : null}
                            {dietJSX}
                        </VStack>
                    </ScrollView>
                    <VStack mt='4' style={styles.containerInfoDown}>
                        {
                            //If you are not saving diets (savingDiets=false) then show the button. Otherwise, show the spinner
                            !this.state.savingDiets? // if you are not saving diets show the button
                                <Button onPress={() => this.saveDietForLoggedUser()}> 
                                    Save Diets
                                </Button>
                            : // otherwise show spinner
                            <Spinner size="sm" />
                        }
                    </VStack>
                    
                </Box>
            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfoUp: {
        margin: 20,
        position: 'relative',
        justifyContent: 'flex-start',
    },
    containerInfoDown: {
        margin: 20,
        position: 'relative',
        justifyContent: 'flex-end',
    },
    filterInfo: {
        marginBottom: 10
    },
    footPage: {
        width: '100%',
        height: 35, 
        position: 'absolute',
        bottom: 5,
    },
    titleInfo: {
        alignSelf: 'center',
    },
    subtitleInfo: {
        alignSelf: 'center',
        fontSize: 14, 
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(DietRestrictions);