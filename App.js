import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDs9yOIS_NCtQyOYZXH66KTQx2be3IgCPo",
  authDomain: "mobile-app-course-a4cea.firebaseapp.com",
  projectId: "mobile-app-course-a4cea",
  storageBucket: "mobile-app-course-a4cea.appspot.com",
  messagingSenderId: "1052673092228",
  appId: "1:1052673092228:web:1b2d2e524e538823dd70d1",
  measurementId: "G-MK3L8MRG8H"
};
const app = initializeApp(firebaseConfig);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      loaded: false,
    }
  }

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name ='Landing' component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name ='Register' component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <Text>User is logged in </Text>
      </View>
    )
  }
}

export default App
