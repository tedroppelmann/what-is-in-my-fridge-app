import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation, useIsFocused, CommonActions, StackActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch  } from 'react-redux'
import { fetchUser } from '../../redux/actions/index'
import FavoritesScreen from  './Favorites';
import RecipeScreen from  './Recipes/Recipe';

const Stack4 = createStackNavigator();

export default function Favorites_stack() {
  const isFocused = useIsFocused();
  // To get previous isFocus value
  const dispatch = useDispatch();
  
  useEffect(() => {
    //console.log("111 Is Focused?", isFocused))
    //console.log("111 Updating currentUser")
    dispatch(fetchUser());
    
  }, [isFocused]);

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