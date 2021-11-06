import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
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


export default function Recipes({ navigation, route }) {

    function transformIngredients(array) {
        let query = array.join();
        console.log(query);
        return query;
    }
    const ingredients = transformIngredients(route.params.selected)

    function getMealData() {
        fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=80256361caf04b358f4cd2de7f094dc6&ingredients=${ingredients}&number=2`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch(() => {
                console.log("error");
            });
    }

    
    return (
        <NativeBaseProvider>
            <Box safeArea flex={1} p="2" py="4" w="90%" mx="auto">
                <Button
                    onPress={getMealData}
                >
                    Test
                </Button>
            </Box>
        </NativeBaseProvider>
    )
}
