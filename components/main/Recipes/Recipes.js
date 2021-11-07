import React, { useState, useEffect } from 'react'
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

    function transformIngredients(array) {
        let query = array.join();
        console.log(query);
        return query;
    }
    const ingredients = transformIngredients(route.params.selected)

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=80256361caf04b358f4cd2de7f094dc6&ingredients=${ingredients}&number=10`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRecipes(data);
            })
            .catch(() => {
                console.log("error");
            });
    },[]);

    const renderRecipes = ({ item, index }) => {
        const { title, image } = item;

        return (
            <TouchableOpacity
            onPress={() => {}}
            style= {styles.item}
            >
                <HStack>
                    <Box safeArea flex={1} p="2" py="4" w="90%" my='auto' mx='auto'>
                        <Text bold>{title}</Text>
                    </Box>
                    <Box safeArea flex={1} p="2" py="4" w="90%" my='auto'>
                        <Image
                            style={styles.image}
                            source={{uri: image}}
                        />
                    </Box>
                </HStack>
            </TouchableOpacity>
        );
    };
    
    return (
        <NativeBaseProvider>
            <Box safeArea flex={1}  w="100%" mx="auto">
                <FlatList
                data={recipes}
                renderItem={renderRecipes}
                numColumns={1}
                ></FlatList>
            </Box>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({

    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/7,
        resizeMode: 'contain',

        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 7,
    }, 

    item: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,

        backgroundColor: 'white',

        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 7,
    },
});