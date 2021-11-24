import React, { useState } from 'react'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';

import {
    Center,
    Box,
    Heading,
    Button,
    FlatList,
    VStack,
    Input,
    Image,
    Icon,
    useToast,
} from 'native-base';

import { INGREDIENTS } from '../../storage/ingredients';
import { CATEGORIES } from '../../storage/ingredients_categories';

export default function App({ navigation }) {
    const ingredients = INGREDIENTS;
    const categories = CATEGORIES;

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [searchText, setSearchText] = useState('');

    const toast = useToast()

    const filteredCategoryData = selectedCategory ? ingredients.filter(x => x.category.toLowerCase().includes(selectedCategory)) 
    : ingredients;

    const filteredData = searchText
      ? filteredCategoryData.filter(x =>
          (x.slug.toLowerCase().includes(searchText.toLowerCase()))
        ) : (selectedCategory ? ingredients.filter(x => x.category.toLowerCase().includes(selectedCategory)) 
        : ingredients);
    
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
                (filteredData.length == index + 1 && filteredData.length % 3 == 2) ? 20 : 5}]}
        >
            <Image
                style={styles.image}
                key={item.slug}
                alt={item.slug}
                source={item.image}
            />
            <Heading size='sm' mt='3' textAlign='center' color='gray.500'>
                {item.name}
            </Heading>
        </TouchableOpacity>
        );
    };

    const renderCategories = ({ item, index }) => {
        const isSelected = selectedCategory.filter((i) => i === item.name.toLowerCase()).length > 0;

        return (
        <TouchableOpacity
            delayPressIn={0}
            activeOpacity={1}
            onPress={() => {
            if (isSelected) {
                setSelectedCategory((prev) => prev.filter((i) => i !== item.name.toLowerCase()));
            } else {
                setSelectedCategory(prev => [item.name.toLowerCase()])
            }
            }}
            style={[styles.category, isSelected && { borderColor: 'gold' }]}
        >
            <Heading size='sm' textAlign='center' color='gray.500'>
                {item.name}
            </Heading>
        </TouchableOpacity>
        );
    };

    return (
        <Center flex={1}>
            <Box safeAreaTop flex={1} pt="3" w="95%" mx="auto">
                <Heading size='xl' textAlign='center'>
                    What's in my fridge?
                </Heading>
                <Input
                    placeholder='Search by name'
                    onChangeText= {(searchText) => setSearchText(searchText)}
                    value={searchText}
                    m='3'
                    size='xl'
                    bg="gray.500"
                    borderRadius="10"
                    placeholderTextColor="gray.500"
                    borderWidth="0"
                    InputLeftElement={
                        <Icon
                        ml="2"
                        size="8"
                        color="gray.500"
                        as={<MaterialCommunityIcons name='magnify'/>}
                        />
                    }
                />
                <Box mb='3'>
                    <FlatList
                        horizontal
                        data={categories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderCategories}
                        height= '60'
                    >
                    </FlatList>
                </Box>
                <FlatList
                    data={filteredData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderIngredients}
                    numColumns={3}
                >
                </FlatList>
                <Button
                    size = 'lg'
                    m = '3'
                    onPress={selectedIngredients.length != 0 ? () => navigation.navigate('Recipes', { selected: selectedIngredients }) : 
                    () => toast.show({
                        title: "Invalid set of ingredients",
                        status: "warning",
                        description: "Please select at least one ingredient.",
                        })
                    }
                >
                    Find recipes
                </Button>
            </Box>
        </Center>
    );
}

const styles = StyleSheet.create({

    item: {
        flex: 1/3,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,

        backgroundColor: '#f5f5f4',

        borderWidth: 3,
        borderColor: '#f5f5f4',
        borderRadius: 7,
        
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height/6,
    },

    category: {
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,

        backgroundColor: '#f5f5f4',

        borderWidth: 3,
        borderColor: '#f5f5f4',
        borderRadius: 7,

        justifyContent: 'center',
    },

    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/10,
        resizeMode: 'contain'
    }, 
});

