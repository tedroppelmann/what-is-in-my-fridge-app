import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import { useSelector, useDispatch  } from 'react-redux'
import FavoritesStackScreen from './main/Favorites_stack'
import ProfileStackScreen from './main/Profile_stack'
import FindRecipesScreen from './main/Find_stack'

import { useIsFocused, useNavigationState, useRoute, useNavigationContainerRef } from '@react-navigation/native'

const Tab = createBottomTabNavigator();

export class Main extends Component {
    _isMounted = false;

    constructor(props){
        super(props)
        this.state={
            isFocused: props.isFocused,
            user: props.currentUser,
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.props.dispatch(fetchUser());
        //console.log("000 USER", this.state.user)
        //console.log("000. componentDidMount Route name", this.props.routeName)
        
    }

    componentDidUpdate(prevProps){
        //console.log("000 MAIN componentDidUpdate was triggered: isFocused value: ", this.state.isFocused)
        //console.log("000. Current routesLength: ", this.props.routesLength)
        //console.log("000. Previous routesLength: ", prevProps.routesLength)
        //console.log("000. Current route name", this.props.routeName)
        //console.log("000. Previous route name", prevProps.routeName)
        
        //if (this.props.routesLength < prevProps.routesLength) {
            // Uncomment these lines to reload favorites when returning from the recipie screen
            //var favoriteRecipes = await this.setFavoriteRecipes()
            //this.setState({favoriteRecipes: favoriteRecipes})
            //console.log("000 MAIN: Reloading REDUX Store")
        //}
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
                <Tab.Screen name='Favorites' component={FavoritesStackScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='star' color={color} size={30} />
                        ),
                        headerShown: false
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

//const isFocused = useIsFocused()
/*
const mapStateToProps = (store, ) => ({
    currentUser: store.userState.currentUser,
    isFocused: isFocused
})*/
//const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

//connect(mapStateToProps, mapDispatchProps)(Main);

export default function(){
    const isFocused = useIsFocused();
    const user = useSelector(state => state.userState.currentUser);
    const dispatch = useDispatch();
    const routesLength = useNavigationState(state => state.routes.length)
    const routeName = useNavigationState((state) => state.index) //state.routes[state.index].name)
    const navigationRef = useNavigationContainerRef();
    return <Main isFocused={isFocused} currentUser={user} dispatch={dispatch} routesLength={routesLength} routeName={routeName} navigationRef={navigationRef} />;

}
