import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, } from 'react-native'
import { 
    Image,
    Input, 
    Spinner,  
    VStack, 
    Box,  
    ScrollView, 
    Icon, 
    Center,
    Heading,
    FlatList
} from 'native-base'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { useSelector  } from 'react-redux'
import FirebaseDb from './Support/FirebaseDb'
import ArrayTransform from './Support/ArrayTransform'
import { v4 as uuidv4 } from 'uuid'
import { useIsFocused } from '@react-navigation/native'
import { fetchUser } from '../../redux/actions/index'
import { useDispatch  } from 'react-redux'

import {createRecipeApiQuery} from './Support/Spoonacular'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class Favorites extends Component{
    
    /*
    Method description: https://es.reactjs.org/docs/react-component.html#constructor
    */
    constructor(props) {
        super(props);
        this.state = {
            user: props.currentUser, // initialize user attribute with the currentUser from redux
            favoriteRecipes: [], 
            uiIsLoading: true,
            searchTerm: "", // this is required for the search input 
            dispatch: props.dispatch,
        }

        this.setSearchTerm = this.setSearchTerm.bind(this)
    }

    /*
    Method description: https://es.reactjs.org/docs/react-component.html#componentdidmount
    */
    async componentDidMount(){
        //console.log("FAVORITES SCREEN: Props: ", this.props)
        this.setState({user: this.props.currentUser})
        var favoriteRecipes = await this.setFavoriteRecipesViaRedux()
        // Call an extra render of the UI after the setting of the favorites in the previous line
        this.setState({favoriteRecipes: favoriteRecipes})
        //console.log("componentDidMount favoriteRecipies: ", this.state.favoriteRecipes) 
    }

    /*
    Method description: https://es.reactjs.org/docs/react-component.html#componentdidupdate
    */
    async componentDidUpdate(prevProps, prevState){
        
        // The following lines of code are to update the list of favorites when you delete one from either from the Recipe Screen (from the same TAB and Stack) or from another TAB.
        if (JSON.stringify(this.state.user.favorites) !== JSON.stringify(prevState.user.favorites)){
            //console.log("222 FAVORITES SCREEN User state is different than its previous state. Current User State: ", JSON.stringify(this.state.user.favorites), " vs Previous User State: ", JSON.stringify(prevState.user.favorites))
            this.props.dispatch(fetchUser());
            this.setState({user: this.state.user})
            var favoriteRecipes = await this.setFavoriteRecipesViaRedux()
            this.setState({favoriteRecipes: favoriteRecipes})
        }
        
        // The following lines are executed when comming from a different TAB. When currentUser changes (or is updated) on another TAB (i.e. the Find Screen Stack), then update the state of the user. After changing the state of the user, its favorite recipes could have changed as well. Now, if the favorite recipes have changed, then the lines of code above will be triggered, thus the state of favoriteRecipes will be updated.
        if (this.props.currentUser.favorites !== prevProps.currentUser.favorites){ 
            //console.log("222 Favorites Screen CURRENT USER CHANGED: Updating Favorites")
            this.setState({ user: this.props.currentUser })
        }
    }

    /*
    Method Description: Using firestore, we initialize an array of objects that contains all favorite recipies that should appear on the UI. Just call this method from componentDidMount.
    */
    async setFavoriteRecipes(){
        try{
            // Connect to firebase 
            const fdb = new FirebaseDb()
            const connFdb = await fdb.initFirestoreDb()
            
            // Query the user document. To obtain a field from the user document, just call field.<field_name>
            const usersCollectionFdb = await fdb.initCollectionDb("Users")
            const userDocId = await fdb.queryIdFromCollectionFdb(usersCollectionFdb, "email", "==", this.state.user.email) //"mellon1786@gmail.com")
            const field = await fdb.queryDocFromFdb(connFdb, "Users", userDocId)
           //console.log("Queried favorites field from a users document: ", field.favorites)
            
            // Make a connection to the Spoonacular API to get Recipie info
            const favoriteRecipes = await this.fetchRecipeInfo(field.favorites)

            // In order to update the state of the favorite recipes, set favorite recipies with new data. Also, in order to stop showing the spinner in the UI, set uiIsLoading to false  
            //console.log("UI is Loading? ", this.state.uiIsLoading)
            this.setState({ uiIsLoading: false })
            //console.log("UI is Loading (After array transform)? ", this.state.uiIsLoading)
            
            return favoriteRecipes
            
        }catch(e){
           console.log(e)
        }
    }

    /*
    Method Description: Using local redux store, we initialize an array of objects that contains all favorite recipies that should appear on the UI. Just call this method from componentDidMount.
    */
    async setFavoriteRecipesViaRedux(){
        try{
            this.setState({ uiIsLoading: true })

            // Get all favorite recipes object
            var favoriteRecipeArray = this.state.user.favorites
            //console.log("User.Favorites: ", favoriteRecipeArray)
            
            // Make a connection to the Spoonacular API to get Recipie info
            const favoriteRecipes = await this.fetchRecipeInfo(favoriteRecipeArray)

            // In order to update the state of the favorite recipes, set favorite recipies with new data. Also, in order to stop showing the spinner in the UI, set uiIsLoading to false  
            //console.log("UI is Loading? ", this.state.uiIsLoading)
            this.setState({ uiIsLoading: false })
            //console.log("UI is Loading (After array transform)? ", this.state.uiIsLoading)
            
            return favoriteRecipes
            
        }catch(e){
           console.log(e)
        }
    }

    /*
    Method description: Return recipe info (recipe image (sourceUrl), recipe name (title), and recipe time (readyInMinutes)) by recipe ID. Add this info to the favorites recipies array
    */
    async fetchRecipeInfo(recipeIdArray){
        try{
            //console.log("Favorite Recipes from Firestore or Redux: ", recipeIdArray)
            
            var favRecipesArray = []
            for(const recipe of recipeIdArray){
                //console.log("Iterating over the favorite recipes. Recipe ID:", recipe.recipe_id)
                
                if (recipe.recipe_id != undefined){
                    //Spoonacular Tomas apiKey=80256361caf04b358f4cd2de7f094dc6
                    //Spoonacular Andres apiKEy=4a53e799e6134b139ddc05f3d97f7136
                    //Spoonacular Andres2 apiKey=4a418dc794ec4390a4d7c7f21ae271da
                    // const apiString = "https://api.spoonacular.com/recipes/" + recipe.recipe_id + "/information?includeNutrition=false&apiKey=80256361caf04b358f4cd2de7f094dc6"
                    //console.log("Api String: ", apiString)
                    const apiString = createRecipeApiQuery(recipe.recipe_id)
                    
                    const apiRes = await fetch(apiString)
                    const apiResJson = await apiRes.json()

                    var arrTrn = new ArrayTransform()
                   //console.log("Spoonacular API Response (Just the recipe_id, title, image, readyInMinutes): ", recipe.recipe_id, apiResJson.title, apiResJson.sourceUrl, apiResJson.readyInMinutes)
                    favRecipesArray = await arrTrn.pushFavorite(favRecipesArray, recipe.recipe_id, apiResJson.title, apiResJson.image, apiResJson.readyInMinutes)
                }
            }
            return favRecipesArray
        }catch(e){
            console.log(e)
            return []
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

    renderFavorites = ({ item, index }) => {
        return(
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Recipe', { recipe_id: item.id, missed_ingredients: null })}
                style= {styles.item} 
                key={uuidv4()}
                justifyContent={"center"}>
                <Box key={uuidv4()} justifyContent={"center"} >
                    <Image
                        borderTopLeftRadius={20}
                        borderTopRightRadius={20}
                        style={styles.image}
                        source={{uri: item.image}}
                        alt={item.title}
                        key={uuidv4()}
                    />
                    <Heading key={uuidv4()} size='md' mb='3' mt='3' textAlign='center' color='white'>
                    {item.title}
                    </Heading>
                </Box>
            </TouchableOpacity>
        );
    };
    
    render(){
        
        const { favoriteRecipes, searchTerm } = this.state
        //console.log("Array of Favorites Recipies: ", favoriteRecipies)
        const JSX = []
        const favorites = []
        
        if (favoriteRecipes != undefined){
            favoriteRecipes.forEach((favoriteRecipe) => {
                if (favoriteRecipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm == null || searchTerm == "") {
                    favorites.push(
                        {id: favoriteRecipe.recipe_id,
                        title: favoriteRecipe.title,
                        image: favoriteRecipe.sourceUrl}
                    )
                    JSX.push(
                        <VStack key={uuidv4()}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Recipe', { recipe_id: favoriteRecipe.recipe_id, missed_ingredients: null })}
                                style= {styles.item} 
                                key={uuidv4()}
                                justifyContent={"center"}>
                                <Box key={uuidv4()} justifyContent={"center"} >
                                    <Image
                                        borderTopLeftRadius={20}
                                        borderTopRightRadius={20}
                                        style={styles.image}
                                        source={{uri: favoriteRecipe.sourceUrl}}
                                        alt={favoriteRecipe.title}
                                        key={uuidv4()}
                                    />
                                    <Heading key={uuidv4()} size='md' mb='3' mt='3' textAlign='center' color='white'>
                                    {favoriteRecipe.title}
                                    </Heading>
                                </Box>
                            </TouchableOpacity>
                        </VStack>
                    )
                }
                
            })
        }

        // If there are no favorite recipes, then display a message
        if (favoriteRecipes.length == 0){
            //console.log("There are no favorite recipes")
            JSX.push(
                <VStack key={uuidv4()}>
                    <Heading key={uuidv4()} size='md' mb='3' mt='3' textAlign='center' color='#10b981'>
                        There are no favorite recipes yet...
                    </Heading>
                </VStack>
            )
        }

        return (
            <Center flex={1}>
                <Box flex={1} pt="1" w="95%" mx="auto">
                    <VStack>
                        <Input  
                            placeholder='Search by name' 
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
                        </Center>
                    :   
                        <FlatList
                            contentContainerStyle={{justifyContent: 'center'}}
                            data={favorites}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderFavorites}
                            numColumns={windowWidth < windowHeight ? 1 : 4}
                        />
                    
                    }
                </Box>
            </Center>
        )
    }
}

export default function(props) {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userState.currentUser); // Replaces mapStateToProps method. Also, the connect method will not be required because currentUser taken from redux is wrapped and inserted as additional props in the next line of code.
    return <Favorites {...props} dispatch={dispatch} isFocused={isFocused} currentUser={user} /> // Here additional props are wraped and inserted to the Favorites component
}

const styles = StyleSheet.create({
    item: {
        flex: 1/4,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        borderRadius: 20,

        backgroundColor: '#10b981',
    },

    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/4,
        //borderTopLeftRadius: 20,
        //borderTopRightRadius: 20,
    }, 
    container: {
        flex: 1,
    },
    containerScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap'
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