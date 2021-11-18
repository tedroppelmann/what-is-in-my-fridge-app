import React, { useState, useEffect } from 'react'
import { ActivityIndicator} from 'react-native'
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
        console.log(query);
        return query;
    }
    const ingredients = transformIngredients(route.params.selected)

    useEffect(() => {
        if (recipes == '') {
            fetch(
                `https://api.spoonacular.com/recipes/findByIngredients?apiKey=80256361caf04b358f4cd2de7f094dc6&ingredients=${ingredients}&number=6&ranking=1`
            )
                .then((response) => response.json())
                .then((data) => {
                    setRecipes(data);
                    setLoading(true);
                })
                .catch(() => {
                    console.log("error");
                });
        }
        
    },[]);

    const renderRecipes = ({ item, index }) => {
        const { id, title, image, missedIngredientCount } = item;

        return (
            <TouchableOpacity
            onPress={() => navigation.navigate('Recipe', { recipe_title: title })}
            style= {styles.item}
            >
                <Box flex={1} p="auto" py="auto">
                    <Image
                        style={styles.image}
                        source={{uri: image}}
                        alt={title}
                    />
                    <Text bold>{title}</Text>
                    <Text bold>Missed Ingredients: {missedIngredientCount}</Text>
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
            <Box safeArea flex={1} py="6" w="90%" mx="auto">
                <FlatList
                data={recipes}
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

        
        borderRadius: 20,
    }, 

    item: {
        flex: 1/2,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 1,
        marginBottom: 1,

        /*backgroundColor: 'white',

        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 7,*/
    },
});