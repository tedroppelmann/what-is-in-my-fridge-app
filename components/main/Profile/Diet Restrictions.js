import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { 
    View, 
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
import FirebaseDb from '../Support/FirebaseDb'
import ArrayTransform from '../Support/ArrayTransform'
import { v4 as uuidv4 } from 'uuid'
import { fetchUser } from '../../../redux/actions/index'
import { useSelector, useDispatch } from 'react-redux'
import { getAuth }  from 'firebase/auth'

export class DietRestrictions extends Component{
    
    /*
    Method description: https://es.reactjs.org/docs/react-component.html#constructor
    */
    constructor(props) {
        super(props);
        this.state = {
            user: props.currentUser, // initialize user attribute with the currentUser from redux
            userId: props.userId,
            diets: [], 
            uiIsLoading: true,
            savingDiets: false, 
            searchTerm: "", // this is required for the search input 
            selectedDiet: "",
        }

        this.saveDietForLoggedUser = this.saveDietForLoggedUser.bind(this)
        this.setSearchTerm = this.setSearchTerm.bind(this)
    }

    /*
    Method description: https://es.reactjs.org/docs/react-component.html#componentdidmount
    */
    async componentDidMount(){
        //console.log("componentDidMount diets previous state: ", this.state.userId)        
        await this.setDietRestrictions()
        //console.log("componentDidMount diets after initialization state", this.state.diets)
        //console.log("componentsDidMount selectedDiet after initialization: ", this.state.selectedDiet)
        //console.log("componentDidMount user is: ", this.state.user)
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
            //const usersCollectionFdb = await fdb.initCollectionDb("Users")
            //console.log("Initialized users collection")
            
            // Query the ID of a user from an already initialized firestore collection given an email
            //const userDocId = await fdb.queryIdFromCollectionFdb(usersCollectionFdb, "email", "==", this.state.user.email)
            //console.log("User document ID obtained", userDocId)
            
            // Update (or insert if the field diets does not exist) the diets of a specified user in the Users firestore collection
            const initFdb = await fdb.initFirestoreDb()
            const updatedRegistry = await fdb.updateRegistryDb(initFdb, this.state.userId, "Users", "diets", this.state.selectedDiet)

            // Once the registry was updated on Firestore, we update the local redux data by calling fetchUser() method which will connect to Firestore and update local user data. 
            //await this.props.dispatch(fetchUser())
            //console.log("REDUX Updated")

            // In order to stop showing the spinner when the execution of this method finishes, set savingDiets to false
            this.setState({ savingDiets: false })
            //console.log("Saving Diets? (After update) ", this.state.savingDiets)

            if (updatedRegistry){ this.showAlert("Diet Restrictions", "Diet Saved Successfully!", "message") } else { this.showAlert("Diet Restrictions", "Diet not saved!", "warning") }
        
        }catch(e){
            console.log(e) // An exception could be thrown if there is no connection to Firestore.
            this.showAlert("Diet Restrictions", "An error has ocurred. Diet might not be saved!", "warning")
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
            //const usersCollectionFdb = await fdb.initCollectionDb("Users")
            //const userDocId = await fdb.queryIdFromCollectionFdb(usersCollectionFdb, "email", "==", this.state.user.email)
            
            // Query the diets field from a user document
            const field2 = await fdb.queryDocFromFdb(connFdb, "Users", this.state.userId)//userDocId)
            //console.log("Queried field from a diet document: ", field.diets)
            //console.log("Queried field2 from a user document: ", field2.diets)
            
            // Update the diets state with all a diets object array 
            const arrTrn = new ArrayTransform()
            const stringTurnedIntoArray = await arrTrn.stringToArrayOfStrings(field.diets)
            
            // In order to stop showing the spinner in the UI, if updating diets state finish executing then set uiIsLoading to false  
            //console.log("UI is Loading? ", this.state.uiIsLoading)
            this.setState({ uiIsLoading: false, diets: stringTurnedIntoArray, selectedDiet: field2.diets })
            //console.log("UI is Loading (After array transform)? ", this.state.uiIsLoading)
            
            //return stringTurnedIntoArray
            
        }catch(e){
           //console.log(e)
        }
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
        const { diets, searchTerm, selectedDiet } = this.state
        //console.log("Array of Diets: ", diets)
        
        const dietJSX = []
        //var switchKey=0;
        if (diets != undefined){
            diets.forEach((diet) => {
                if (diet.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm == null || searchTerm == "") {
                    if (diet == selectedDiet){
                        dietJSX.push(
                            <View key={uuidv4()} style={{flexDirection:"row", height:25, marginBottom:50, flex:1}}>
                                <TouchableOpacity key={uuidv4()} style={styles.btn} onPress={()=>{this.setState({selectedDiet: ""})}}>
                                        <Text key={uuidv4()} fontSize={"md"} style={{justifyContent: 'flex-start', flex:1}}> {diet} </Text>
                                        <Image key={uuidv4()} style={{height:30, width:30, justifyContent: 'center'}} source={require("../../../storage/radio_button_images/radioChecked.png")} />
                                </TouchableOpacity>
                            </View>
                        )
                    }else{
                        dietJSX.push(
                            <View key={uuidv4()} style={{flexDirection:"row", height:25, marginBottom:50, flex:1}}>
                                <TouchableOpacity delayPressIn={0} activeOpacity={1} key={uuidv4()} style={styles.btn} onPress={()=>{this.setState({selectedDiet: diet})}}>
                                    <Text key={uuidv4()} fontSize={"md"} style={{justifyContent: 'flex-start', flex:1}}> {diet} </Text>
                                    <Image key={uuidv4()} style={{height:30, width:30, justifyContent: 'center'}} source={require("../../../storage/radio_button_images/radioNotChecked.png")} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                }
                //switchKey++;
            })
        }

        return (
            <Center flex={1}>
                <Box flex={1} pt="3" w="95%" mx="auto">
                    <VStack>
                        <Input  
                            placeholder='Search dietary restrictions...' 
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
                    {this.state.uiIsLoading? 
                        <Center flex={1}>
                            <Spinner/>
                        </Center> : 
                        <ScrollView>
                            <VStack style={styles.containerInfoUp}>
                                {dietJSX}
                            </VStack>
                        </ScrollView>
                    }
                    <VStack mt='4' style={styles.containerInfoDown}>
                        <Button 
                            onPress={() => this.saveDietForLoggedUser()}
                            size = 'lg'
                            m = '3'
                        > 
                            {!this.state.savingDiets? 
                                <Heading size='sm' textAlign='center' color='white'>
                                Save Diet
                                </Heading>:
                                <Spinner size='sm' color='white'/>
                            }
                        </Button>
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
    return <DietRestrictions {...props} currentUser={user} toast={toast} dispatch={dispatch} userId={auth.currentUser.uid} /> // Here additional props are wraped and inserted to the Favorites component
}

/*
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(DietRestrictions);
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
    radiobutton: {
        height: 30,
        width: 30,
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