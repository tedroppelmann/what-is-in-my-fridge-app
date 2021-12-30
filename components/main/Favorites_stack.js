import React, { Component } from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FavoritesScreen from  './Favorites';
import RecipeScreen from  './Recipes/Recipe';

const Stack4 = createStackNavigator();

export default function Favorites_stack() {
    return (
        <NavigationContainer independent={true}>
          <StatusBar barStyle="dark-content"/>
          <Stack4.Navigator initialRouteName='Favorites'>
            <Stack4.Screen name="Favorites" component={FavoritesScreen} />
            <Stack4.Screen name="Recipe" component={RecipeScreen}  />
          </Stack4.Navigator>
        </NavigationContainer>
    )
}