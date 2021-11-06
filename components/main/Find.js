import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';

import {
    NativeBaseProvider,
    Box,
    Heading,
    Button,
    FlatList,
    VStack,
    Input,
    Image,
} from 'native-base';

import { Title } from 'react-native-paper';
import Constants from 'expo-constants';
  
const { width } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({ navigation }) {
    const INGREDIENTS = [
        {
            name: 'Bananas',
            slug: 'bananas',
            url: 'https://image.freepik.com/vector-gratis/racimo-platano-amarillo-maduro-vector-aislado-sobre-fondo-blanco_1284-45456.jpg',
        },
        {
            name: 'Tomatoes',
            slug: 'tomatoes',
            url: 'https://www.maxpixel.net/static/photo/1x/Tomatoes-Vegetables-Ripe-Healthy-Vegetarian-Food-5412517.png',
        },
        {
            name: 'Bread',
            slug: 'bread',
            url: 'https://www.terhuneorchards.com/wp-content/uploads/2020/06/products-white_loaf__82103.1586278247.1000.1200.png',
        },
        {
            name: 'Potatoes',
            slug: 'potatoes',
            url: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/23457/3824efde0a7073a68ad4287e0186a4f3_large.png&width=256&type=webp&quality=80',
        },
        {
            name: 'Garlic',
            slug: 'garlic',
            url: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/1564405684704157570/b7387d856c21481fe4a0c9f144bed827_large.png&width=256&type=webp&quality=80'
        },
        {
            name: 'Meat',
            slug: 'meat',
            url: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00203311000008/13f8e65a2fb10d445e11a3e5c770c3c6_large.png&width=256&type=webp&quality=80',
        },
        {
            name: 'Eggs',
            slug: 'eggs',
            url: 'https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/256/256/true/eyJpZCI6ImU4YjczODAzMjEyMjliZTFmMjBiYzJkNDI4MDE5YzdlIiwic3RvcmFnZSI6InB1YmxpY19zdG9yZSJ9?signature=8c3c8f0a93cce35c05696ab0c0db432ba37b7374216183cd56ebfaa4796c1262',
        },
        {
            name: 'Sugar',
            slug: 'sugar',
            url: 'https://st.depositphotos.com/1034300/1353/i/600/depositphotos_13534388-stock-photo-sugar-cubes-sweet-food.jpg',
        },
    ];
    const [ingredients, setIngredients] = useState(INGREDIENTS);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const renderIngredients = ({ item, index }) => {
        const { name, slug, url } = item;
        const isSelected = selectedIngredients.filter((i) => i === slug).length > 0;
    
        return (
        <TouchableOpacity
        onPress={() => {
        if (isSelected) {
            setSelectedIngredients((prev) => prev.filter((i) => i !== slug));
        } else {
            setSelectedIngredients(prev => [...prev, slug])
        }
        }}
        style={[styles.item, isSelected && { borderColor: 'gold'}]}>
            <Image
                style={styles.image}
                source={{uri: url}}
            />
            <Text style={{ color: isSelected ? "black" : "black"}}>{name}</Text>
        </TouchableOpacity>
        );
    };

    return (
        <NativeBaseProvider>
            <Box safeArea flex={1} p="2" py="4" w="90%" mx="auto">
                <Heading size='xl' mb='3'>
                    What ingredients do you have?
                </Heading>
                <Input 
                style={styles.filterInfo}
                placeholder='Filter'
                />
                <FlatList
                data={ingredients}
                renderItem={renderIngredients}
                numColumns={2}
                >
                </FlatList>
                <VStack mt="4">
                    <Button
                    onPress={() => navigation.navigate('Recipes', { selected: selectedIngredients })}>
                        Find recipes
                    </Button>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        padding: 8,
    },

    item: {
        flex: 1/2,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,

        backgroundColor: 'white',

        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 7,
        
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight/5,
    },

    titleInfo: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 25
    }, 

    filterInfo: {
        marginBottom: 10
    },

    image: {
        width: Dimensions.get('window').width,
        height: windowHeight/7,
        resizeMode: 'contain'
    }, 
});

