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
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    Button,
    FlatList,
    HStack,
    VStack,
    Input,
    Image,
    Center,
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
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=80256361caf04b358f4cd2de7f094dc6&includeIngredients=${ingredients}&number=6&sort=max-used-ingredients&fillIngredients=true`
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
            style= {styles.item}
            >
                <Box flex={1} p="auto" py="auto">
                    <Image
                        style={styles.image}
                        source={{uri: image}}
                        alt={title}
                    />
                    <Heading size='sm' mb='5' mt='2' textAlign='center'>
                    {title}
                    </Heading>
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
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        )
      }
    return (
        <NativeBaseProvider>
            <Box safeArea flex={1} py="3" w="95%" mx="auto">
                <FlatList
                data={recipes.results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRecipes}
                numColumns={2}
                ></FlatList>
            </Box>
        </NativeBaseProvider>
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
        marginTop: 1,
        marginBottom: 10,
        borderRadius: 20,

        backgroundColor: 'white',
        /*
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 7,*/
    },
});