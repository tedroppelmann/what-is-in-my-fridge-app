import React, { useState, useEffect } from 'react'
import { useIsFocused } from "@react-navigation/native";
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
import {
    Box,
    Text,
    Heading,
    FlatList,
    HStack,
    VStack,
    Image,
    Center,
    Spinner,
} from 'native-base';
import { getAuth }  from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid'
import { createComplexSearchApiQuery } from '../Support/Spoonacular';
import FirebaseDb from '../Support/FirebaseDb'

export default function Recipes(props) {
    const [recipes_min, setRecipesMin] = useState("");
    const [recipes_max, setRecipesMax] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSelected, setSeleted] = useState(true);
    const fdb = new FirebaseDb()

    function transformIngredients(array) {
        let query = array.join();
        return query;
    }
    const ingredients = transformIngredients(props.route.params.selected)
    
    let dietRestriction = '';
    let intoleranceRestriction = '';

    const isFocused = useIsFocused();
    
    async function getUserDocument(){
        const initFdb = await fdb.initFirestoreDb()
        const userData = await fdb.queryDocFromFdb(initFdb, "Users", getAuth().currentUser.uid)
        //console.log("User Queried is: ", userData.email)
        return userData
    }

    useEffect(() => {
        if (isFocused) {
            //console.log('Ingredients:', ingredients);
            if (recipes_min == '' && recipes_max == '') {
                
                getUserDocument().then((data) => {
                    if (data.diets) {
                        dietRestriction = data.diets;
                        //console.log('Dietary restrictions:', dietRestriction);
                    };
                    if (data.intolerances) {
                        intoleranceRestriction = data.intolerances;
                        //console.log('Intolerance restrictions:',intoleranceRestriction);
                    };
                    fetch(createComplexSearchApiQuery(ingredients, intoleranceRestriction, dietRestriction, 'min-missing'))
                            .then((response) => response.json())
                            .then((data) => {
                                setRecipesMin(data);
                                setLoading(true);
                                //console.log('API Min data stored');
                            })
                            .catch(() => {
                                console.log("Recipes Screen. Min-missing fetch error.");
                            });
                        fetch(createComplexSearchApiQuery(ingredients, intoleranceRestriction, dietRestriction, 'max-used'))
                        .then((response) => response.json())
                        .then((data) => {
                            setRecipesMax(data);
                            setLoading(true);
                            //console.log('API Max data stored');
                        })
                        .catch(() => {
                            console.log("Recipes Screen. Max-used fetch error.");
                        });
                })

            } 
        }
    }, [isFocused]);

    const renderRecipes = ({ item, index }) => {
        const { id, title, image, usedIngredientCount, missedIngredientCount, usedIngredients } = item;
        //console.log("Recipessss Screen. recipeID looks like:", id)
        //console.log("Recipessss Screen. usedIngredients looks like:", usedIngredients)
        return (
            <TouchableOpacity
            key={uuidv4()}
            onPress={() => props.navigation.navigate('Recipe', { recipe_id: id, used_ingredients: usedIngredients })}
            style= {[ styles.item ]}
            >
                <Box key={uuidv4()} flex={1} key={uuidv4()} >
                    <Image
                        style={styles.image}
                        source={{uri: image}}
                        alt={uuidv4()}
                        key={uuidv4()}
                    />
                    <Heading key={uuidv4()} size='sm' mb='5' mt='2' textAlign='center'>
                    {title}
                    </Heading>
                </Box> 
                <Box key={uuidv4()}>
                    <Heading key={uuidv4()} size='xs' mb='2' mt='1' textAlign='center'>
                        Ingredients
                    </Heading>
                    <HStack key={uuidv4()} mb='5' justifyContent= 'center'>
                        <VStack key={uuidv4()}>
                            <Heading key={uuidv4()} size='lg' textAlign='center' color='yellowgreen'>
                                {usedIngredientCount}
                            </Heading>
                            <Text key={uuidv4()} textAlign='center'>
                                used
                            </Text>
                        </VStack>
                        <VStack key={uuidv4()} ml='8'>
                            <Heading key={uuidv4()} size='lg' textAlign='center' color='tomato'>
                                {missedIngredientCount}
                            </Heading>
                            <Text key={uuidv4()} textAlign='center'>
                                missed
                            </Text>
                        </VStack>
                    </HStack>
                </Box>
            </TouchableOpacity>
        );
    };

    let color_left = '#f5f5f4';
    let color_right = 'gray.500';
    if (isSelected){
        color_left = '#f5f5f4';
    } else {
        color_left = 'gray.500';
        color_right = '#f5f5f4';
    }

    if (!loading) {
        return (
            <Center flex={1}>
                <Spinner/>
            </Center>
        )
      }
    
    return (
        <Box flex={1} bg='white'>
                <Box w="95%" mx="auto" mb='5' flex={1} flexDirection={'row'}>
                    <FlatList
                        ListHeaderComponent={
                            <HStack key={uuidv4()}>
                                <TouchableOpacity key={uuidv4()}
                                    delayPressIn={0}
                                    activeOpacity={1}
                                    onPress={() => {setSeleted(true)}}
                                    style={[styles.category_left, isSelected && { backgroundColor: '#10b981', borderColor: '#10b981'}]}
                                >
                                    <Heading key={uuidv4()} size='sm' textAlign='center' color={color_left}>
                                        Less missed
                                    </Heading>
                                    <Heading key={uuidv4()} size='sm' textAlign='center' color={color_left}>
                                        ingredients
                                    </Heading>
                                </TouchableOpacity>
                                <TouchableOpacity key={uuidv4()}
                                    delayPressIn={0}
                                    activeOpacity={1}
                                    onPress={() => {setSeleted(false)}}
                                    style={[styles.category_right, !isSelected && { backgroundColor: '#10b981', borderColor: '#10b981'}]}
                                >
                                    <Heading key={uuidv4()} size='sm' textAlign='center' color={color_right}>
                                        More used
                                    </Heading>
                                    <Heading key={uuidv4()} size='sm' textAlign='center' color={color_right}>
                                        ingredients
                                    </Heading>
                                </TouchableOpacity>
                            </HStack>
                        }
                        showsVerticalScrollIndicator={false}
                        data={ isSelected ? recipes_min.results : recipes_max.results}
                        renderItem={renderRecipes}
                        numColumns={2}
                    />
                </Box>
        </Box>
    )
}

const styles = StyleSheet.create({

    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }, 

    item: {
        flex: 1/2,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 0,
        borderRadius: 20,

        backgroundColor: '#f5f5f4',
    },

    category_left: {
        flex: 1/2,
        marginLeft: 5,
        height: 40,
        marginTop: 20,
        marginBottom: 10,

        backgroundColor: '#f5f5f4',

        borderWidth: 3,
        borderColor: '#f5f5f4',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,

        justifyContent: 'center',
    },
    category_right: {
        flex: 1/2,
        marginRight: 5,
        height: 40,
        marginTop: 20,
        marginBottom: 10,

        backgroundColor: '#f5f5f4',

        borderWidth: 3,
        borderColor: '#f5f5f4',
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,

        justifyContent: 'center',
    },
});