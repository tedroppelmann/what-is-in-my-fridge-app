import React, { useState } from 'react'
import {
    Text,
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

import Constants from 'expo-constants';

import { INGREDIENTS } from '../../storage/ingredients';
import { CATEGORIES } from '../../storage/ingredients_categories';

export default function App({ navigation }) {
    const ingredients = INGREDIENTS;
    const categories = CATEGORIES;

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchText, setSearchText] = useState('');

    const filteredData = searchText
      ? ingredients.filter(x =>
          x.slug.toLowerCase().includes(searchText.toLowerCase())
        ) : ingredients;
    
    const renderCategories = ({ item, index }) => {
        const isSelected = selectedCategories.filter((i) => i === item.name).length > 0;
        return (
        <TouchableOpacity
        delayPressIn={0}
        activeOpacity={1}
        onPress={() => {
        if (isSelected) {
            setSelectedCategories((prev) => prev.filter((i) => i !== item.name));
        } else {
            setSelectedCategories(prev => [...prev, item.name])
        }
        }}
        style={[styles.item_categorie, isSelected && { borderColor: 'gold'}]}>
            <Text style={{ color: isSelected ? "black" : "black"}}>{item.name}</Text>
        </TouchableOpacity>
        );
    };
    
    const renderIngredients = ({ item, index }) => {
        const isSelected = selectedIngredients.filter((i) => i === item.slug).length > 0;
        return (
        <TouchableOpacity
        delayPressIn={0}
        activeOpacity={1}
        onPress={() => {
        if (isSelected) {
            setSelectedIngredients((prev) => prev.filter((i) => i !== item.slug));
        } else {
            setSelectedIngredients(prev => [...prev, item.slug])
        }
        }}
        
        style={[styles.item, isSelected && { borderColor: 'gold'}, 
        {marginRight: (filteredData.length == index + 1 && filteredData.length % 3 == 1) ? 40 : 
            (filteredData.length == index + 1 && filteredData.length % 3 == 2) ? 20 : 5}]}>
            <Image
                style={styles.image}
                key={item.slug}
                alt={item.slug}
                source={item.image}
            />
            <Heading size='sm' mt='3' textAlign='center'>
                {item.name}
            </Heading>
        </TouchableOpacity>
        );
    };

    return (
        <NativeBaseProvider backgroundColor= 'black'>
            <Box safeArea flex={1} p="2" py="4" w="95%" mx="auto" >
                <Heading size='xl' mb='3' textAlign='center'>
                    What's in my fridge?
                </Heading>
                <Input 
                size="lg"
                style={styles.filterInfo}
                placeholder='Search by name or categorie'
                onChangeText= {(searchText) => setSearchText(searchText)}
                value={searchText}
                />
                <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderIngredients}
                numColumns={3}
                >
                </FlatList>
                <VStack mt="4">
                    <Button
                    size = 'lg'
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
        flex: 1/3,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,

        backgroundColor: 'white',

        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 7,
        
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height/6,
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
        height: Dimensions.get('window').height/10,
        resizeMode: 'contain'
    }, 
});

