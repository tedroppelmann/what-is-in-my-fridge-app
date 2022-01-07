import React, { Component } from 'react'
import { StyleSheet, Alert, TouchableOpacity } from 'react-native'
import {  
    View, 
    Switch, 
    Input, 
    Spinner, 
    Button, 
    VStack, 
    Box, 
    Text, 
    ScrollView, 
    Icon,
    Center,
    Heading,
    useToast,
} from 'native-base'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
//import { connect } from 'react-redux'
import FirebaseDb from '../Support/FirebaseDb'
import ArrayTransform from '../Support/ArrayTransform'
import { v4 as uuidv4 } from 'uuid';
import { fetchUser } from '../../../redux/actions/index'
import { useSelector, useDispatch } from 'react-redux'
import { getAuth }  from 'firebase/auth'

export class IntoleranceRestrictions extends Component{
    
    /*
    Method description: https://es.reactjs.org/docs/react-component.html#constructor
    */
    constructor(props) {
        super(props);
        this.state = {
            user: props.currentUser, // initialize user attribute with the currentUser from redux
            userId: props.userId, // initialize user id from Firebase getAuth() method
            intolerances: [], 
            uiIsLoading: true,
            savingIntolerances: false, 
            searchTerm: "", // this is required for the search input 
        }

        this.saveIntoleraForLoggedUser = this.saveIntoleraForLoggedUser.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
        this.setSearchTerm = this.setSearchTerm.bind(this)
    }

    /*
    Method description: https://es.reactjs.org/docs/react-component.html#componentdidmount
    */
    async componentDidMount(){
        //console.log("componentDidMount intolerances previous state: ", this.state.intolerances)        
        var intolerances = await this.setIntoleranceRestrictions()
        // Call an extra render of the UI after the setting of the intolerance restriction in the previous line
        this.setState({intolerances: intolerances})
        //console.log("componentDidMount intolerances after initialization state", this.state.intolerances)
    }

    /* 
    Method description: Parse to string the intolerances selected on the UI and save them on the users collection on firestore
    */
    async identifySelectedIntolerances(){
        var selectedIntolerances = [];
        var i=0;
        this.state.intolerances.forEach(() => {
            if(this.state.intolerances[i].toggle){
                selectedIntolerances.push(this.state.intolerances[i].name);
                //console.log(this.state.intolerances[i].name," was selected.");
            }else{
                //console.log(this.state.intolerances[i].name," was not selected.");
            }
            i++;
        })
        var selectedIntolerancesToString = selectedIntolerances.toString();
        //console.log("Intolerances parsed to string: ", selectedIntolerancesToString);
        return selectedIntolerancesToString; 
    }

    /*
    Method Description: used on pressed button from UI to save a selected intolerance restriction from a user into a firestore database 
    */
    async saveIntoleraForLoggedUser(){
        try{
            // In order to show the spinner while the execution of this method, set first savingIntolerances to true
            this.setState({ savingIntolerances: true })
            //console.log("Saving intolerances? (After update) ", this.state.savingIntolerances)

            // Create a new object from the class FirebaseDb to be able to query (select, insert and update) the Firestore NoSQL database
            const fdb = new FirebaseDb()
            
            // Instantiate a Firebase database collection with the database name passed on the parameters
            //const usersCollectionFdb = await fdb.initCollectionDb("Users")
            //console.log("Initialized users collection")
            
            // Query the ID of a user from an already initialized firestore collection given an email
            //const userDocId = await fdb.queryIdFromCollectionFdb(usersCollectionFdb, "email", "==", this.state.user.email)
            //console.log("User document ID obtained", userDocId)
            
            // Identify which intolerances were selected and create a string separated by commas.
            const intolerances = await this.identifySelectedIntolerances()
            //console.log("intolerances selected: ", intolerances)
            
            // Update (or insert if the field intolerances does not exist) the intolerances of a specified user in the Users firestore collection
            const initFdb = await fdb.initFirestoreDb()
            const updatedRegistry = await fdb.updateRegistryDb(initFdb, this.state.userId, "Users", "intolerances", intolerances)

            // Once the registry was updated on Firestore, we update the local redux data by calling fetchUser() method which will connect to Firestore and update local user data. 
            //await this.props.dispatch(fetchUser())
            //console.log("REDUX Updated")

            // In order to stop showing the spinner when the execution of this method finishes, set savingIntolerances to false
            this.setState({ savingIntolerances: false })
            //console.log("Saving intolerances? (After update) ", this.state.savingIntolerances)

            if (updatedRegistry){ this.showAlert("Intolerance Restrictions", "Intolerances Saved Successfully!", "message") } else { this.showAlert("Intolerance Restrictions", "Intolerances not saved!", "warning") }
        
        }catch(e){
            console.log(e) // An exception could be thrown if there is no connection to Firestore.
            this.showAlert("Intolerance Restrictions", "An error has ocurred. Intolerances might not be saved!", "warning")
        }
    }
    
    /*
    Method Description: initialize an array of objects that contains all intolerance restrictions that should appear on the UI for the user to select or deselect them. 
    */
    async setIntoleranceRestrictions(){
        try{
            // Connect to firebase and query the intolerances document from the Restrictions collection database 
            const fdb = new FirebaseDb()
            const connFdb = await fdb.initFirestoreDb()
            const field = await fdb.queryDocFromFdb(connFdb, "Restrictions", "intolerances")
            //console.log("Queried field from a document: ", field.intolerances)
            
            // Query userId from the user document in Firestore
            //const usersCollectionFdb = await fdb.initCollectionDb("Users")
            //const userDocId = await fdb.queryIdFromCollectionFdb(usersCollectionFdb, "email", "==", this.state.user.email)
            
            // Query the intolerances field 
            const field2 = await fdb.queryDocFromFdb(connFdb, "Users", this.state.userId)
            //console.log("Queried field from a intolerance document: ", field.intolerances)
            //console.log("Queried field2 from a user document: ", field2.intolerances)
            
            // Update the intolerances state with all a intolerances object array 
            const arrTrn = new ArrayTransform()
            const stringTurnedIntoArray = await arrTrn.stringToArray(field.intolerances, field2.intolerances)
            
            // In order to stop showing the spinner in the UI, if updating intolerances state finish executing then set uiIsLoading to false  
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
          state.intolerances[i].toggle = !state.intolerances[i].toggle;
          //console.log(state.intolerances[i].name, " toggled.")
          return {
            intolerances: state.intolerances
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

    showAlert(title, message, status) {     
        this.props.toast.show({
            title: title,
            status: status,
            description: message,
        })    
    }  
    
    render(){
        const { intolerances, searchTerm } = this.state
        //console.log("Array of intolerances: ", intolerances)
        const JSX = []
        var switchKey=0;
        if (intolerances != undefined){
            // this is required to enable the search input filtering

            intolerances.forEach((intolerance) => {
                if (intolerance.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm == null || searchTerm == "") {
                    JSX.push(
                        <View key={uuidv4()} style={{flexDirection:"row", height:25, marginBottom:50, flex:1}}>
                            <TouchableOpacity delayPressIn={0} activeOpacity={1} key={uuidv4()} style={styles.btn} onPress={this.toggleSwitch(switchKey)}>
                                <View key={uuidv4()} style={{justifyContent: 'flex-start', flex:1}}>
                                    <Text fontSize={"md"} key={uuidv4()} style={{justifyContent: 'flex-start', flex:1}} > {intolerance.name} </Text>
                                </View>
                            </TouchableOpacity>
                            <View key={uuidv4()} style={{justifyContent: 'center'}}>
                                <Switch
                                    key={switchKey}
                                    colorScheme='emerald'
                                    onToggle={this.toggleSwitch(switchKey)}
                                    isChecked={intolerance.toggle}
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
                            placeholder='Search intolerance restrictions...' 
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
                            //If you are not saving intolerances (savingIntolerances=false) then show the button. Otherwise, show the spinner
                            !this.state.savingIntolerances? // if you are not saving intolerances show the button
                                <Button 
                                    onPress={() => this.saveIntoleraForLoggedUser()}
                                    size = 'lg'
                                    m = '3'
                                > 
                                    <Heading size='sm' textAlign='center' color='white'>
                                        Save Intolerances
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

export default function(props) {
    const toast = useToast()
    const dispatch = useDispatch()
    const auth = getAuth();
    const user = useSelector(state => state.userState.currentUser); // Replaces mapStateToProps method. Also, the connect method will not be required because currentUser taken from redux is wrapped and inserted as additional props in the next line of code.
    return <IntoleranceRestrictions {...props} currentUser={user} toast={toast} dispatch={dispatch} userId={auth.currentUser.uid} /> // Here additional props are wraped and inserted to the Favorites component
}

/*
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(IntoleranceRestrictions);
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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