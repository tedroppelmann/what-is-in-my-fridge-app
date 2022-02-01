import React, { useState, useEffect, useRef } from 'react'  // AL Modification: useRef
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import {
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';
import {
    Box,
    Text,
    Heading,
    FlatList,
    HStack,
    VStack,
    Center,
    Spinner,
    ScrollView,
} from 'native-base';
import { getAuth }  from 'firebase/auth'
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { fetchUser } from '../../../redux/actions/index'  // AL Modification: 
import { useSelector, useDispatch  } from 'react-redux'  // AL Modification: 
import FirebaseDb from '../Support/FirebaseDb'
import { createRecipeApiQuery } from '../Support/Spoonacular';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Recipe(props) { // AL Modifications: Changed route to props which is a more generic name and reflects much more of what is received from the parent components
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const dispatch = useDispatch(); // To dispatch an action in order to update local redux store with new favorites.
    const recipe_id = props.route.params.recipe_id; // AL Modifications: Changed route to props
    const used_ingredients = props.route.params.used_ingredients; // AL Modifications: Changed route to props
    const auth = getAuth();
    const prevFavoritesRef = useRef();  // AL Modification: 
    const prevFavorites = prevFavoritesRef.current;  // AL Modification: Set previous favorite state from the saved state in useEffect hook. 
    const user = useSelector(state => state.userState.currentUser); // AL Modification: Get the current user from the context
    const fdb = new FirebaseDb()

    useEffect(() => { 
        prevFavoritesRef.current = user.favorites // AL Modification: Saving previous favorite recipes
        //console.log("Recipe Screen. Props looks like: ", props)
        if (recipe === null) {
            fetch(createRecipeApiQuery(recipe_id))
            .then((response) => response.json())
            .then((data) => {
                setRecipe(data);
                setLoading(true);
            }).then(() =>{
                if(user.favorites.filter(e => e.recipe_id === recipe_id).length > 0){
                    //console.log("RECIPE SCREEN. Set Favorite to TRUE")
                    setFavorite(true);
                } else {
                    //console.log("RECIPE SCREEN. Set Favorite to FALSE")
                    setFavorite(false);
                }
            })
            .catch(() => {
                console.log("RECIPE SCREEN. Error");
            });

        } else {
            //console.log("RECIPE SCREEN. 2 Recipe is empty? Checking GlutenFree to see if recipe is empty: ", recipe.glutenFree)
            // Check if favorites have changed. 
            if(JSON.stringify(user.favorites) !== JSON.stringify(prevFavorites)){
                //console.log("RECIPE SCREEN. Favorites are different.", user.favorites)
                // If the recipe is still a favorite one, then set favorite to true and re-render automatically the favorite STAR ICON
                if(user.favorites.filter(e => e.recipe_id === recipe_id).length > 0){
                    //console.log("RECIPE SCREEN. Set Favorite to TRUE")
                    setFavorite(true);
                } else {
                    //console.log("RECIPE SCREEN. Set Favorite to FALSE")
                    setFavorite(false);
                }
            }
        }
    });

    const renderStep = ({ item, index }) => {
        return(
            <Box w="90%" mx='auto'>
                <HStack mb='3' space={3} w="90%">
                    <Heading size='lg'>
                        {item.number}
                    </Heading>
                    <Text>
                        {item.step}
                    </Text>
                </HStack>
            </Box>
        );
    };

    const renderIngredient = ({ item, index }) => {
        // AL Modifications. This modifications is required for the Favorites feature.
        var isUsed = false
        if (used_ingredients != null || used_ingredients != undefined){
            isUsed = used_ingredients.filter((i) => i.name === item.name).length > 0;  
        } 
        // AL Modifications
        return(
            <Center style={ [styles.item, 
            {marginRight: (recipe.extendedIngredients.length == index + 1 && recipe.extendedIngredients.length % 3 == 1) ? 25 : 
                (recipe.extendedIngredients.length == index + 1 && recipe.extendedIngredients.length % 3 == 2) ? 15 : 5},
            {backgroundColor: used_ingredients == null ? '#d3d3d3' : isUsed ? 'yellowgreen' : 'tomato'} ] }>
                <Text textAlign='center' bold>{item.name}</Text>
                <Text textAlign='center'>{item.amount} {item.unit}</Text>
            </Center>
        );
    };

    if (!loading) {
        return (
            <Center flex={1}>
                <Spinner/>
            </Center>
        )
    };

    async function addFavorite(){
        const initFdb = await fdb.initFirestoreDb()
        const registryUpdated = await fdb.updateRegistryDb(initFdb, auth.currentUser.uid, "Users", "favorites", arrayUnion({recipe_id}))
        //console.log("User Updated.", registryUpdated)
    }

    async function removeFavorite(){
        const initFdb = await fdb.initFirestoreDb()
        const registryUpdated = await fdb.updateRegistryDb(initFdb, auth.currentUser.uid, "Users", "favorites", arrayRemove({recipe_id}))
        //console.log("User Updated.", registryUpdated)
    }

    if (windowHeight > windowWidth){
        return (
            <Center flex={1}>
                    <FlatList
                        ListHeaderComponent={
                            <Box>
                                <ImageBackground
                                    style={styles.image_phone}
                                    source={{uri: recipe.image}}
                                    alt={recipe.id}
                                >
                                    <Box 
                                        bg='white'
                                        position="absolute"
                                        roundedTopLeft="lg"
                                        bottom="0"
                                        right='0'
                                    >
                                        <TouchableOpacity
                                            delayPressIn={0}
                                            onPress={() => {
                                                if (!favorite) {
                                                    setFavorite(true);
                                                    addFavorite().then(() => {
                                                        dispatch(fetchUser())
                                                        console.log("Updating Local Redux with new favorite recipes.")
                                                    })
                                                } else {
                                                    setFavorite(false);
                                                    removeFavorite().then(() => {
                                                        dispatch(fetchUser())
                                                        console.log("Updating Local Redux with lesser favorite recipes.")
                                                    })
                                                }
                                                
                                            }}
                                        >
                                            <MaterialCommunityIcons name={favorite ? 'star' : 'star-outline'} color={favorite ? 'gold' : 'gold'} size={40} style={{margin:10}}/>
                                        </TouchableOpacity>
                                    </Box>
                                </ImageBackground>
                                <Box flex={1} py="6" w="90%" mx="auto" alignItems="center">
                                    <Heading size='xl' mb='3' textAlign='center'>
                                        {recipe.title}
                                    </Heading>
                                    <HStack>
                                        <Center h="20" w="20">
                                            <MaterialCommunityIcons name='clock-outline' size={30} />
                                            <Text bold={true}>
                                                {recipe.readyInMinutes}'
                                            </Text>
                                        </Center>
                                        <Center h="20" w="20">
                                            <MaterialCommunityIcons name='account-group-outline' size={30} />
                                            <Text bold={true}>
                                                {recipe.servings}
                                            </Text>
                                        </Center>
                                    </HStack>
                                </Box>
                                <Box w="90%" mx='auto'>
                                    <Heading size='lg' mb='3'>
                                        Restrictions
                                    </Heading>
                                    <HStack flex={1} mx="auto" mb='3'>
                                        <Center  m='2' alignItems="center" borderRadius='7' >
                                            <MaterialCommunityIcons name='cow' size={26} color={recipe.dairyFree ? 'yellowgreen' : 'tomato'}/>
                                            {recipe.dairyFree ? <Text>Dairy Free</Text> : <Text>Not Dairy Free</Text>}
                                        </Center>
                                        <Center m='2' alignItems="center" borderRadius='7'>
                                            <MaterialCommunityIcons name='barley' size={26} color={recipe.glutenFree ? 'yellowgreen' : 'tomato'}/>
                                            {recipe.glutenFree ? <Text>Gluten Free</Text> : <Text>Not Gluten Free</Text>}
                                        </Center>
                                        <Center m='2' alignItems="center" borderRadius='7'>
                                            <MaterialCommunityIcons name='sprout' size={26} color={recipe.vegetarian ? 'yellowgreen' : 'tomato'}/>
                                            {recipe.vegetarian ? <Text>Vegetarian</Text> : <Text>Not Vegetarian</Text>}
                                        </Center>
                                    </HStack>
                                </Box>
                                <Box w="90%" mx='auto'>
                                    <Heading size='lg' mb='3'>
                                        Ingredients
                                    </Heading>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{justifyContent: 'center'}}
                                        scrollEnabled={false}
                                        data={recipe.extendedIngredients}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={renderIngredient}
                                        numColumns={3}
                                    />
                                    <Heading size='lg' mb='3'mt='3'>
                                        Steps
                                    </Heading>
                                </Box>
                            </Box>
                        }
                        showsVerticalScrollIndicator={false}
                        data={recipe.analyzedInstructions[0].steps}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderStep}
                        numColumns={1}
                    />
            </Center>
        )
    } else {
        return (
                <HStack>
                    <VStack backgroundColor='#f5f5f4' width={windowWidth/3} height={windowHeight}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <Box alignItems='center'>
                            <ImageBackground
                                style={styles.image_tablet}
                                source={{uri: recipe.image}}
                                alt={recipe.id}
                            >
                                <Box 
                                    bg='white'
                                    position="absolute"
                                    roundedTopLeft="lg"
                                    bottom="0"
                                    right='0'
                                >
                                    <TouchableOpacity
                                        delayPressIn={0}
                                        onPress={() => {
                                            if (!favorite) {
                                                setFavorite(true);
                                                addFavorite().then(() => {
                                                    dispatch(fetchUser())
                                                    //console.log("Updating Local Redux with new favorite recipes.")
                                                })
                                            } else {
                                                setFavorite(false);
                                                removeFavorite().then(() => {
                                                    dispatch(fetchUser())
                                                    //console.log("Updating Local Redux with lesser favorite recipes.")
                                                })
                                            }
                                            
                                        }}
                                    >
                                        <MaterialCommunityIcons name={favorite ? 'star' : 'star-outline'} color={favorite ? 'gold' : 'gold'} size={40} style={{margin:10}}/>
                                    </TouchableOpacity>
                                </Box>
                            </ImageBackground>
                        </Box>
                        <Box py="6" w="90%" mx="auto" alignItems="center">
                            <Heading size='lg' mb='3' textAlign='center'>
                                {recipe.title}
                            </Heading>
                            <HStack>
                                <Center h="20" w="20" backgroundColor='#f5f5f4'>
                                    <MaterialCommunityIcons name='clock-outline' size={30} />
                                    <Text bold={true}>
                                        {recipe.readyInMinutes}'
                                    </Text>
                                </Center>
                                <Center h="20" w="20" backgroundColor='#f5f5f4'>
                                    <MaterialCommunityIcons name='account-group-outline' size={30} />
                                    <Text bold={true}>
                                        {recipe.servings}
                                    </Text>
                                </Center>
                            </HStack>
                        </Box>
                        <Heading size='lg' mb='3' textAlign='center'>
                            Restrictions
                        </Heading>
                        <HStack mx="auto" mb='3'>
                            <Center  m='2' alignItems="center" borderRadius='7' backgroundColor='#f5f5f4'>
                                <MaterialCommunityIcons name='cow' size={26} color={recipe.dairyFree ? 'yellowgreen' : 'tomato'}/>
                                {recipe.dairyFree ? <Text>Dairy Free</Text> : <Text>Not Dairy Free</Text>}
                            </Center>
                            <Center m='2' alignItems="center" borderRadius='7' backgroundColor='#f5f5f4'>
                                <MaterialCommunityIcons name='barley' size={26} color={recipe.glutenFree ? 'yellowgreen' : 'tomato'}/>
                                {recipe.glutenFree ? <Text>Gluten Free</Text> : <Text>Not Gluten Free</Text>}
                            </Center>
                            <Center m='2' alignItems="center" borderRadius='7' backgroundColor='#f5f5f4'>
                                <MaterialCommunityIcons name='sprout' size={26} color={recipe.vegetarian ? 'yellowgreen' : 'tomato'}/>
                                {recipe.vegetarian ? <Text>Vegetarian</Text> : <Text>Not Vegetarian</Text>}
                            </Center>
                        </HStack>
                        <Box mb='150'></Box>
                        </ScrollView>
                    </VStack>
                    <FlatList
                        width={windowWidth/3}
                        height={windowHeight}
                        backgroundColor= 'white'
                        ListHeaderComponent={
                            <Box>
                                <Box w="90%" mx='auto'>
                                    <Heading size='lg' mb='3' mt='5'>
                                        Ingredients
                                    </Heading>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{justifyContent: 'center'}}
                                        scrollEnabled={false}
                                        data={recipe.extendedIngredients}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={renderIngredient}
                                        numColumns={3}
                                    />
                                    <Heading size='lg' mb='3'mt='3'>
                                        Steps
                                    </Heading>
                                </Box>
                            </Box>
                        }
                        showsVerticalScrollIndicator={false}
                        data={recipe.analyzedInstructions[0].steps}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderStep}
                        numColumns={1}
                        ListFooterComponent={
                            <Box mb='200'>
                            </Box>
                        }
                    />
                </HStack>
        )
    }
}

const styles = StyleSheet.create({

    image_phone: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/2.5,
    }, 

    image_tablet: {
        width: Dimensions.get('window').width/3,
        height: Dimensions.get('window').height/2.5,
    }, 

    item: {
        flex: 1/3,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,

        backgroundColor: 'white',

        
        borderRadius: 7,
        
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height/10,
    },
});
