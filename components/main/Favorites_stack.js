import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch  } from 'react-redux'
import { fetchUser } from '../../redux/actions/index'
import FavoritesScreen from  './Favorites';
import RecipeScreen from  './Recipes/Recipe';

const Stack4 = createStackNavigator();

export default function Favorites_stack() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const prevFocusRef = useRef();
  const prevIsFocus = prevFocusRef.current;
  
  useEffect(() => {
    //console.log("Favorites Stack Is Focused?", isFocused)
    //console.log("Favorites Stack was Previously Focused?", prevIsFocus)
    if(isFocused){
      //console.log("Favorites Stack Updating currentUser")
      dispatch(fetchUser());
    }
    prevFocusRef.current = isFocused
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