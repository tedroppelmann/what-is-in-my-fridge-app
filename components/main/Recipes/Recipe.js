import React, { useState, useEffect } from 'react'
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
    Center,
    Spinner,
    VStack,
} from 'native-base';

import { getAuth }  from 'firebase/auth'
import { getFirestore, updateDoc, doc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { fetchUser } from '../../../redux/actions/index'
import { useDispatch  } from 'react-redux'

export default function Recipe({ route }) {
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const dispatch = useDispatch(); // To dispatch an action in order to update local redux store with new favorites.
    const recipe_id = route.params.recipe_id;
    const missed_ingredients = route.params.missed_ingredients;

    const auth = getAuth();
    const db = getFirestore();
    
    useEffect(() => {
        getDoc(doc(db, 'Users', getAuth().currentUser.uid))
            .then((snapshot) => {
                if (snapshot.data().favorites.filter(e => e.recipe_id === recipe_id).length > 0) {
                    setFavorite(true);
                };
            });
        if (recipe == '') {
            fetch(
                //Spoonacular Tomas apiKey=80256361caf04b358f4cd2de7f094dc6
                //Spoonacular Andres apiKEy=4a53e799e6134b139ddc05f3d97f7136
                //Spoonacular Andres2 apiKey=4a418dc794ec4390a4d7c7f21ae271da
                `https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=4a53e799e6134b139ddc05f3d97f7136&includeNutrition=true`
            )
                .then((response) => response.json())
                .then((data) => {
                    setRecipe(data);
                    setLoading(true);
                })
                .catch(() => {
                    console.log("error");
                });
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
        var isMissed = false
        if (missed_ingredients != null || missed_ingredients != undefined){
            isMissed = missed_ingredients.filter((i) => i.name === item.name).length > 0;  
        } 
        // AL Modifications
        return(
            <Center style={ [styles.item, 
            {marginRight: (recipe.extendedIngredients.length == index + 1 && recipe.extendedIngredients.length % 3 == 1) ? 25 : 
                (recipe.extendedIngredients.length == index + 1 && recipe.extendedIngredients.length % 3 == 2) ? 15 : 5},
            {backgroundColor: isMissed ? 'tomato' : 'yellowgreen'} ] }>
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

    return (
        <Center flex={1}>
                <FlatList
                    ListHeaderComponent={
                        <Box>
                            <ImageBackground
                                style={styles.image}
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
                                                updateDoc(doc(db, 'Users', auth.currentUser.uid), {
                                                    favorites: arrayUnion({recipe_id}),
                                                }).then(()=> {
                                                    dispatch(fetchUser()); // AL Modifications: Update the local redux store with new favorites.
                                                });
                                            } else {
                                                setFavorite(false);
                                                updateDoc(doc(db, 'Users', auth.currentUser.uid), {
                                                    favorites: arrayRemove({recipe_id}),
                                                }).then(()=> {
                                                      dispatch(fetchUser()); // AL Modifications: Update the local redux store with new favorites. 
                                                });
                                                
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
                                        <Text>Dairy Free</Text>
                                    </Center>
                                    <Center m='2' alignItems="center" borderRadius='7'>
                                        <MaterialCommunityIcons name='barley' size={26} color={recipe.dairyFree ? 'yellowgreen' : 'tomato'}/>
                                        <Text>Gluten Free</Text>
                                    </Center>
                                    <Center m='2' alignItems="center" borderRadius='7'>
                                        <MaterialCommunityIcons name='sprout' size={26} color={recipe.vegetarian ? 'yellowgreen' : 'tomato'}/>
                                        <Text>Vegetarian</Text>
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
}

const styles = StyleSheet.create({

    image: {
        width: Dimensions.get('window').width,
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
