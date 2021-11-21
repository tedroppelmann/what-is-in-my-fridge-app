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
    ScrollView,
} from 'native-base';

export default function Recipe({ navigation, route }) {
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);

    const recipe_id = route.params.recipe_id;
    const missed_ingredients = route.params.missed_ingredients;
    console.log(missed_ingredients);

    useEffect(() => {
        if (recipe == '') {
            fetch(
                `https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=80256361caf04b358f4cd2de7f094dc6&includeNutrition=true`
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setRecipe(data);
                    setLoading(true);
                })
                .catch(() => {
                    console.log("error");
                });
        }
        
    },[]);

    const renderStep = ({ item, index }) => {
        return(
            <HStack mb='3' space={3} w="90%">
                <Heading size='lg'>
                    {item.number}
                </Heading>
                <Text>
                    {item.step}
                </Text>
            </HStack>
        );
    };

    const renderIngredient = ({ item, index }) => {
        const isMissed = missed_ingredients.filter((i) => i.name === item.name).length > 0;
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
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        )
    };

    return (
        <NativeBaseProvider>
            <ScrollView backgroundColor='white'>
                <Image
                    style={styles.image}
                    source={{uri: recipe.image}}
                    alt={recipe.id}
                />
                <Box flex={1} py="6" w="90%" mx="auto" alignItems="center">
                    <Heading size='xl' mb='3' textAlign='center'>
                        {recipe.title}
                    </Heading>
                    <HStack space={3}>
                        <Center h="20" w="20" rounded="md">
                            <MaterialCommunityIcons name='clock-outline' size={26} />
                            <Text bold={true}>
                                {recipe.readyInMinutes}'
                            </Text>
                        </Center>
                        <Center h="20" w="20" rounded="md">
                            <MaterialCommunityIcons name='account-group-outline' size={26} />
                            <Text bold={true}>
                                {recipe.servings}
                            </Text>
                        </Center>
                        <Center h="20" w="20" rounded="md">
                            <MaterialCommunityIcons name='star-outline' size={26} />
                        </Center>
                    </HStack>
                </Box>
                <Box flex={1} w="90%" mx="auto">
                    <Heading size='lg' mb='3'>
                        Ingredients
                    </Heading>
                    <FlatList
                        contentContainerStyle={{justifyContent: 'center'}}
                        scrollEnabled={false}
                        data={recipe.extendedIngredients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderIngredient}
                        numColumns={3}
                    ></FlatList>
                    <Heading size='lg' mb='3'mt='3'>
                        Steps
                    </Heading>
                    <FlatList
                        scrollEnabled={false}
                        data={recipe.analyzedInstructions[0].steps}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderStep}
                        numColumns={1}
                    ></FlatList>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
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
