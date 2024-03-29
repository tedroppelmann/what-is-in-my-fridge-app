import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import {
  Spinner,
  Center,
  NativeBaseProvider,
  extendTheme,
} from "native-base"

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDit6k1tOCrdsXQudPATUdQytB-LryhE10",
  authDomain: "mobile-app-dev-b6760.firebaseapp.com",
  projectId: "mobile-app-dev-b6760",
  storageBucket: "mobile-app-dev-b6760.appspot.com",
  messagingSenderId: "727645352873",
  appId: "1:727645352873:web:b13fae7f75dd0be97a4ab8",
  measurementId: "G-X3BSQKSRTP"
};
const app = initializeApp(firebaseConfig);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from  './components/Main';

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

    const theme = extendTheme({
      components: {
        Button: {
          defaultProps: {
            colorScheme: 'emerald',
            borderRadius: 10,
          },
        },
        Center: {
          defaultProps: {
            backgroundColor: 'white',
          },
        },
        Input: {
          defaultProps: {
            rounded: '3xl',
            backgroundColor: '#f5f5f4',
          },
        },
        Spinner: {
          defaultProps: {
            size: 'lg',
            color: '#10b981',
          },
        },
      },
    });

    if (!loaded) {
      return (
        <NativeBaseProvider theme={theme}>
          <Center flex={1}>
            <Spinner/>
          </Center>
        </NativeBaseProvider>
      )
    }

    if (!loggedIn) {
      return (
        <NativeBaseProvider theme={theme}>
          <StatusBar
            barStyle="dark-content"
          />
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Landing'>
              <Stack.Screen name ='Landing' component={LandingScreen} options={{headerShown: false}}/>
              <Stack.Screen name ='Register' component={RegisterScreen}options={{headerTintColor: '#10b981'}}/>
              <Stack.Screen name="Login" component={LoginScreen} options={{headerTintColor: '#10b981'}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      )
    }

    return (
      <NativeBaseProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Main'>
              <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    )
  }
}

export default App
