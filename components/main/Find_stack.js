import React, { Component } from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FindScreen from  './Find';
import RecipesScreen from  './Recipes/Recipes';
import RecipeScreen from  './Recipes/Recipe';

const Stack2 = createStackNavigator();

export default function Find_stack() {
    return (
        <NavigationContainer independent={true}>
          <StatusBar barStyle="dark-content"/>
          <Stack2.Navigator initialRouteName='Find'>
            <Stack2.Screen name="Find" component={FindScreen} options={{headerShown: false}}/>
            <Stack2.Screen name="Recipes" component={RecipesScreen}/>
            <Stack2.Screen name="Recipe" component={RecipeScreen}/>
          </Stack2.Navigator>
        </NavigationContainer>
    )
}