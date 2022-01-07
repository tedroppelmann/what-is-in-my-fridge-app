import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch  } from 'react-redux'
import { fetchUser } from '../../redux/actions/index'
import FindScreen from  './Find';
import RecipesScreen from  './Recipes/Recipes';
import RecipeScreen from  './Recipes/Recipe';

const Stack2 = createStackNavigator();

export default function Find_stack() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const prevFocusRef = useRef();
  const prevIsFocus = prevFocusRef.current;

  useEffect(() => {
    //console.log("FIND STAK. Is Focused?", isFocused)
    //console.log("FIND STACK. Was Previously Focused?", prevIsFocus)
    if(isFocused){
      //console.log("FIND STACK. Updating currentUser")
      dispatch(fetchUser());
    }
    prevFocusRef.current = isFocused
  }, [isFocused]);

    return (
        <NavigationContainer independent={true}>
          <StatusBar barStyle="dark-content"/>
          <Stack2.Navigator initialRouteName='Find'>
            <Stack2.Screen name="Find" component={FindScreen} options={{headerShown: false}}/>
            <Stack2.Screen name="Recipes" component={RecipesScreen} options={{headerTintColor: '#10b981'}}/>
            <Stack2.Screen name="Recipe" component={RecipeScreen} options={{headerTintColor: '#10b981'}}/>
          </Stack2.Navigator>
        </NavigationContainer>
    )
}
