import React, { Component } from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from  './Profile';
import DietRestrictionsScreen from  './Profile/Diet Restrictions';
import IngredientsExlusionScreen from  './Profile/Ingredients Exclusion';
import IntoleranceRestrictionsScreen from  './Profile/Intolerance Restrictions';

const Stack3 = createStackNavigator();

export default function Profile_stack() {
    return (
        <NavigationContainer independent={true}>
          <StatusBar barStyle="dark-content"/>
          <Stack3.Navigator initialRouteName='Profile'>
            <Stack3.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
            <Stack3.Screen name="Dietary Restrictions" component={DietRestrictionsScreen} options={{headerTintColor: '#10b981'}}/>
            <Stack3.Screen name="Ingredients Exclusion" component={IngredientsExlusionScreen} options={{headerTintColor: '#10b981'}}/>
            <Stack3.Screen name="Intolerance Restrictions" component={IntoleranceRestrictionsScreen} options={{headerTintColor: '#10b981'}}/>
          </Stack3.Navigator>
        </NavigationContainer>
    )
}