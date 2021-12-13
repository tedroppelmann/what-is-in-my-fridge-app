import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import FavoritesScreen from './main/Favorites'
import ProfileStackScreen from './main/Profile_stack'
import FindRecipesScreen from './main/Find_stack'

const Tab = createBottomTabNavigator();

export class Main extends Component {
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        this.props.fetchUser();
    }
    
    render() {
        return (
            <Tab.Navigator 
                initialRouteName='Find' 
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#50C878',
                }}
            > 
                <Tab.Screen name='Favorites' component={FavoritesScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='star' color={color} size={30} />
                        ),
                    }} />
                <Tab.Screen name='Find' component={FindRecipesScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='plus-box' color={color} size={55} />
                        ),
                        headerShown: false
                    }} />
                <Tab.Screen name='Profile' component={ProfileStackScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='account-circle' color={color} size={30} />
                        ),
                        headerShown: false
                    }} />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
