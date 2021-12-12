import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { 
    NativeBaseProvider, 
    View, 
    Switch, 
    Input, 
    Spinner, 
    Button, 
    VStack, 
    Box, 
    Text, 
    ScrollView,
    Center,
    Heading,
    Icon, 
} from 'native-base'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { connect } from 'react-redux'
import FirebaseDb from '../Support/FirebaseDb'
import ArrayTransform from '../Support/ArrayTransform'
import { v4 as uuidv4 } from 'uuid';

export class IngredientsExclusion extends Component{
    
    /*
    Method description: https://es.reactjs.org/docs/react-component.html#constructor
    */
    constructor(props) {
        super(props);
        this.state = {
            user: props.currentUser, // initialize user attribute with the currentUser from redux
            exclusions: [], 
            uiIsLoading: true,
            savingExclusions: false, 
            searchTerm: "", // this is required for the search input 
        }

        this.saveExclusionForLoggedUser = this.saveExclusionForLoggedUser.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
        this.setSearchTerm = this.setSearchTerm.bind(this)
    }

    /*
    Method description: https://es.reactjs.org/docs/react-component.html#componentdidmount
    */
    async componentDidMount(){
        //console.log("componentDidMount exclusions previous state: ", this.state.exclusions)        
        var exclusions = await this.setExclusionRestrictions()
        // Call an extra render of the UI after the setting of the exclusion restriction in the previous line
        this.setState({exclusions: exclusions})
        //console.log("componentDidMount exclusions after initialization state", this.state.exclusions)
    }

    /* 
    Method description: Parse to string the exclusions selected on the UI and save them on the users collection on firestore
    */
    async identifySelectedExclusions(){
        var selectedExclusions = [];
        var i=0;
        this.state.exclusions.forEach(() => {
            if(this.state.exclusions[i].toggle){
                selectedExclusions.push(this.state.exclusions[i].name);
                //console.log(this.state.exclusions[i].name," was selected.");
            }else{
                //console.log(this.state.exclusions[i].name," was not selected.");
            }
            i++;
        })
        var selectedExclusionsToString = selectedExclusions.toString();
        //console.log("exclusions parsed to string: ", selectedExclusionsToString);
        return selectedExclusionsToString; 
    }

    /*
    Method Description: used on pressed button from UI to save a selected exclusion restriction from a user into a firestore database 
    */
    async saveExclusionForLoggedUser(){
        try{
            // In order to show the spinner while the execution of this method, set first savingExclusions to true
            this.setState({ savingExclusions: true })
            //console.log("Saving exclusions? (After update) ", this.state.savingExclusions)

            // Create a new object from the class FirebaseDb to be able to query (select, insert and update) the Firestore NoSQL database
            const fdb = new FirebaseDb()
            
            // Instantiate a Firebase database collection with the database name passed on the parameters
            const usersCollectionFdb = await fdb.initCollectionDb("Users")
            //console.log("Initialized users collection")
            
            // Query the ID of a user from an already initialized firestore collection given an email
            const userDocId = await fdb.queryIdFromCollectionFdb(usersCollectionFdb, "email", "==", this.state.user.email)
            //console.log("User document ID obtained", userDocId)
            
            // Identify which exclusions were selected and create a string separated by commas.
            const exclusions = await this.identifySelectedExclusions()
            //console.log("exclusions selected: ", exclusions)
            
            // Update (or insert if the field exclusions does not exist) the exclusions of a specified user in the Users firestore collection
            const initFdb = await fdb.initFirestoreDb()
            const updatedRegistry = await fdb.updateRegistryDb(initFdb, userDocId, "Users", "exclusions", exclusions)

            // In order to stop showing the spinner when the execution of this method finishes, set savingExclusions to false
            this.setState({ savingExclusions: false })
            //console.log("Saving exclusions? (After update) ", this.state.savingExclusions)

            if (updatedRegistry){ this.showAlert("Ingredients Exclusion", "Exclusions Saved Successfully!") } else { this.showAlert("Ingredients Exclusion", "Exclusions not saved!") }
        
        }catch(e){
            console.log(e) // An exception could be thrown if there is no connection to Firestore.
            this.showAlert("Ingredients Exclusion", "Exclusions not saved!")
        }
    }
    
    /*
    Method Description: initialize an array of objects that contains all exclusion restrictions that should appear on the UI for the user to select or deselect them. 
    */
    async setExclusionRestrictions(){
        try{
            // Connect to firebase and query the exclusions document from the Restrictions collection database 
            const fdb = new FirebaseDb()
            const connFdb = await fdb.initFirestoreDb()
            const field = await fdb.queryDocFromFdb(connFdb, "Restrictions", "exclusions")
            //console.log("Queried field from a document: ", field.exclusions)
            
            // Query the exclusions field from the user document
            const usersCollectionFdb = await fdb.initCollectionDb("Users")
            const userDocId = await fdb.queryIdFromCollectionFdb(usersCollectionFdb, "email", "==", this.state.user.email)
            const field2 = await fdb.queryDocFromFdb(connFdb, "Users", userDocId)
            //console.log("Queried field from a exclusion document: ", field.exclusions)
            //console.log("Queried field2 from a user document: ", field2.exclusions)
            
            // Update the exclusions state with all a exclusions object array 
            const arrTrn = new ArrayTransform()
            const stringTurnedIntoArray = await arrTrn.stringToArray(field.exclusions, field2.exclusions)
            
            // In order to stop showing the spinner in the UI, if updating exclusions state finish executing then set uiIsLoading to false  
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
          state.exclusions[i].toggle = !state.exclusions[i].toggle;
          //console.log(state.exclusions[i].name, " toggled.")
          return {
            exclusions: state.exclusions
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
        const { exclusions, searchTerm } = this.state
        //console.log("Array of exclusions: ", exclusions)
        const JSX = []
        var switchKey=0;
        if (exclusions != undefined){
            exclusions.forEach((exclusion) => {
                // this is required to enable the search input filtering
                if (exclusion.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm == null || searchTerm == "") {
                    JSX.push(
                        <View key={uuidv4()} style={{flexDirection:"row", height:25, marginBottom:50, flex:1}}>
                            <View key={uuidv4()} style={{justifyContent: 'flex-start', flex:1}}>
                                <Text fontSize={"md"} key={uuidv4()} style={{justifyContent: 'flex-start', flex:1}} > {exclusion.name} </Text>
                            </View>
                            <View key={uuidv4()} style={{justifyContent: 'center'}}>
                                <Switch
                                    key={switchKey}
                                    colorScheme='emerald'
                                    onToggle={this.toggleSwitch(switchKey)}
                                    isChecked={exclusion.toggle}
                                />  
                            </View>
                        </View>
                    )
                } 
                switchKey++;
            })
        }

        return (
            <Center flex={1}>
                <Box flex={1} pt="3" w="95%" mx="auto">
                    <VStack>
                        <Input  
                            placeholder='Search ingredients to exclude...' 
                            onChangeText={(text) => this.setSearchTerm(text)}
                            m='3'
                            size='xl'
                            bg="gray.500"
                            borderRadius="10"
                            placeholderTextColor="gray.500"
                            borderWidth="0"
                            InputLeftElement={
                                <Icon
                                ml="2"
                                size="8"
                                color="gray.500"
                                as={<MaterialCommunityIcons name='magnify'/>}
                                />
                            }
                        />
                    </VStack>
                    <ScrollView>
                        <VStack style={styles.containerInfoUp}>
                            {this.state.uiIsLoading? <Spinner color="emerald" size="lg" /> : null}
                            {JSX}
                        </VStack>
                    </ScrollView>
                    <VStack mt='4' style={styles.containerInfoDown}>
                        {
                            //If you are not saving exclusions (savingExclusions=false) then show the button. Otherwise, show the spinner
                            !this.state.savingExclusions? // if you are not saving exclusions show the button
                                <Button 
                                    onPress={() => this.saveExclusionForLoggedUser()}
                                    size = 'lg'
                                    m = '3'
                                > 
                                    <Heading size='sm' textAlign='center' color='white'>
                                        Save Exclusions
                                    </Heading>
                                </Button>
                            : // otherwise show spinner
                            <Spinner color="emerald" size="lg" />
                        }
                    </VStack>
                    
                </Box>
            </Center>
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

export default connect(mapStateToProps, null)(IngredientsExclusion);