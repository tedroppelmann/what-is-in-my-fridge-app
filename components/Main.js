import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { fetchUser } from '../redux/actions/index'
import { useSelector, useDispatch  } from 'react-redux'
import FavoritesStackScreen from './main/Favorites_stack'
import ProfileStackScreen from './main/Profile_stack'
import FindRecipesScreen from './main/Find_stack'

const Tab = createBottomTabNavigator();

export class Main extends Component {
    _isMounted = false;

    constructor(props){
        super(props)
        this.state={
            user: props.currentUser,
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.props.dispatch(fetchUser());
    }
    
    render() {
        return (
            <Tab.Navigator 
                initialRouteName='Find' 
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#10b981',
                }}
            > 
                <Tab.Screen name='Favorites' component={FavoritesStackScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='star' color={color} size={30} style={{ width:30 }}/>
                        ),
                        headerShown: false
                    }} />
                <Tab.Screen name='Find' component={FindRecipesScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='fridge' color={color} size={35} style={{ width:30 }}/>
                        ),
                        headerShown: false
                    }} />
                <Tab.Screen name='Profile' component={ProfileStackScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='account-circle' color={color} size={30} style={{ width:30 }}/>
                        ),
                        headerShown: false
                    }} />
            </Tab.Navigator>
        )
    }
}

export default function(){
    const user = useSelector(state => state.userState.currentUser);
    const dispatch = useDispatch();
    return <Main currentUser={user} dispatch={dispatch} />;

}
