import React, { useState, useEffect } from 'react'
import { ActivityIndicator} from 'react-native'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import {
    View,
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


export default function Recipes({ navigation, route }) {
    const [recipes, setRecipes] = useState("");
    const [loading, setLoading] = useState(false);

    function transformIngredients(array) {
        let query = array.join();
        return query;
    }
    const ingredients = transformIngredients(route.params.selected)

    useEffect(() => {
        if (recipes == '') {
            fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=80256361caf04b358f4cd2de7f094dc6&includeIngredients=${ingredients}&number=6&sort=min-missing-ingredients&fillIngredients=true&instructionsRequired=true`
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setRecipes(data);
                    setLoading(true);
                })
                .catch(() => {
                    console.log("error");
                });
        } 
    },[]);

    const renderRecipes = ({ item, index }) => {
        const { id, title, image, missedIngredients, usedIngredientCount } = item;

        return (
            <TouchableOpacity
            onPress={() => navigation.navigate('Recipe', { recipe_id: id, missed_ingredients: missedIngredients })}
            style= {[styles.item ,
            {marginBottom: (recipes.results.length == index + 1 || recipes.results.length == index + 2? 10 : 0)} ]}
            >
                <Box flex={1} >
                    <Image
                        style={styles.image}
                        source={{uri: image}}
                        alt={title}
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
                                {missedIngredients.length}
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
    if (!loading) {
        return (
            <Center flex={1}>
                <Spinner/>
            </Center>
        )
      }
    return (
        <Center flex={1}>
            <Box w="95%" mx="auto">
                <FlatList
                data={recipes.results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRecipes}
                numColumns={2}
                ></FlatList>
            </Box>
        </Center>
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
        /*
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 7,*/
    },
});