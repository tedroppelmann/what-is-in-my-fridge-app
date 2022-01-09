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
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid'
import { createComplexSearchApiQuery } from '../../Spoonacular';


export default function Recipes(props) {
    const [recipes_min, setRecipesMin] = useState("");
    const [recipes_max, setRecipesMax] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSelected, setSeleted] = useState(true);

    function transformIngredients(array) {
        let query = array.join();
        return query;
    }
    const ingredients = transformIngredients(props.route.params.selected)

    const db = getFirestore();
    
    let dietRestriction = '';
    let intoleranceRestriction = '';

    const isFocused = useIsFocused();
    
    useEffect(() => {
        if (isFocused) {
            console.log('Ingredients:', ingredients);
            if (recipes_min == '' && recipes_max == '') {
                getDoc(doc(db, 'Users', getAuth().currentUser.uid))
                    .then((snapshot) => {
                        if (snapshot.data().diets) {
                            dietRestriction = snapshot.data().diets;
                            console.log('Dietary restrictions:', dietRestriction);
                        };
                        if (snapshot.data().intolerances) {
                            intoleranceRestriction = snapshot.data().intolerances;
                            console.log('Intolerance restrictions:',intoleranceRestriction);
                        };
                        fetch(createComplexSearchApiQuery(ingredients, intoleranceRestriction, dietRestriction, 'min-missing'))
                            .then((response) => response.json())
                            .then((data) => {
                                setRecipesMin(data);
                                setLoading(true);
                                console.log('API Min data stored');
                            })
                            .catch(() => {
                                console.log("error");
                            });
                        fetch(createComplexSearchApiQuery(ingredients, intoleranceRestriction, dietRestriction, 'max-used'))
                        .then((response) => response.json())
                        .then((data) => {
                            setRecipesMax(data);
                            setLoading(true);
                            console.log('API Max data stored');
                        })
                        .catch(() => {
                            console.log("error");
                        });
                    });
            } 
        }
    }, [isFocused]);

    const renderRecipes = ({ item, index }) => {
        const { id, title, image, usedIngredientCount, missedIngredientCount, usedIngredients } = item;

        return (
            <TouchableOpacity
            onPress={() => props.navigation.navigate('Recipe', { recipe_id: id, used_ingredients: usedIngredients })}
            style= {[ styles.item ]}
            >
                <Box flex={1} >
                    <Image
                        style={styles.image}
                        source={{uri: image}}
                        alt={uuidv4()}
                        key={uuidv4()}
                    />
                    <Heading size='sm' mb='5' mt='2' textAlign='center'>
                    {title}
                    </Heading>
                </Box> 
                <Box>
                    <Heading size='xs' mb='2' mt='1' textAlign='center'>
                        Ingredients
                    </Heading>
                    <HStack mb='5' justifyContent= 'center'>
                        <VStack>
                            <Heading size='lg' textAlign='center' color='yellowgreen'>
                                {usedIngredientCount}
                            </Heading>
                            <Text textAlign='center'>
                                used
                            </Text>
                        </VStack>
                        <VStack ml='8'>
                            <Heading size='lg' textAlign='center' color='tomato'>
                                {missedIngredientCount}
                            </Heading>
                            <Text textAlign='center'>
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
                <Box w="95%" mx="auto" mb='5'>
                    <FlatList
                        ListHeaderComponent={
                            <HStack>
                                <TouchableOpacity
                                    delayPressIn={0}
                                    activeOpacity={1}
                                    onPress={() => {setSeleted(true)}}
                                    style={[styles.category_left, isSelected && { backgroundColor: '#10b981', borderColor: '#10b981'}]}
                                >
                                    <Heading size='sm' textAlign='center' color={color_left}>
                                        Less missed
                                    </Heading>
                                    <Heading size='sm' textAlign='center' color={color_left}>
                                        ingredients
                                    </Heading>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    delayPressIn={0}
                                    activeOpacity={1}
                                    onPress={() => {setSeleted(false)}}
                                    style={[styles.category_right, !isSelected && { backgroundColor: '#10b981', borderColor: '#10b981'}]}
                                >
                                    <Heading size='sm' textAlign='center' color={color_right}>
                                        More used
                                    </Heading>
                                    <Heading size='sm' textAlign='center' color={color_right}>
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