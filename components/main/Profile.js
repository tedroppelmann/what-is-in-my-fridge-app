import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, } from 'react-native'
import { 
    Button, 
    VStack, 
    Box, 
    Center,
    Heading,
    HStack
} from 'native-base'
import { MaterialCommunityIcons } from 'react-native-vector-icons'

import { getAuth }  from 'firebase/auth'
import { connect } from 'react-redux'

function Profile(props) {
    const navigation = props.navigation;

    const [user, setUser] = useState(null);

    useEffect(() => {
        //console.log("PROFILE SCREEN. Props is: ", props)
        const { currentUser } = props;
        setUser(currentUser);
    })

    const onLogout = () => {
        getAuth().signOut();
    }

    if (user === null) {
        return <View></View>
    }

    return (  
        <Center flex={1} bg='emerald.500' safeAreaTop>
            <Box alignSelf= 'flex-end' >
                <Button
                    onPress={() => onLogout()}
                >
                    <MaterialCommunityIcons name='logout' size={30} color='white'/>
                </Button>
            </Box>
            <Box flex={1/2} w="100%" mx="auto" bg='emerald.500' justifyContent='center'>
                <Heading size='xl' textAlign='center' color='white'>
                    {user.name}
                </Heading>
                <Heading size='sm' textAlign='center' color='white'>
                    {user.email}
                </Heading>
            </Box>
            <Box flex={1} w="100%" mx="auto" bg='white' borderTopRadius='60'>
                <VStack w="80%" mx="auto" mt='10'>
                    <HStack justifyContent='center'>
                        <Button 
                            mr='3' 
                            height= {Dimensions.get('window').height/6}
                            flex= {1/2}
                            justifyContent='center'
                            onPress={() => navigation.navigate('Dietary Restrictions')}
                        >
                            <Box alignItems='center'> 
                                <MaterialCommunityIcons name='food-off' size={50} color='white'/>
                                <Heading size='sm' textAlign='center' color='white'>
                                    Dietary Restrictions
                                </Heading>
                            </Box>
                        </Button>
                        <Button
                            ml='3' 
                            height= {Dimensions.get('window').height/6}
                            flex= {1/2}
                            onPress={() => navigation.navigate('Intolerance Restrictions')}
                        >
                            <Box alignItems='center'> 
                                <MaterialCommunityIcons name='peanut-off' size={50} color='white'/>
                                <Heading size='sm' textAlign='center' color='white'>
                                    Intolerance Restrictions
                                </Heading>
                            </Box>
                        </Button>
                    </HStack>
                    <HStack justifyContent='center'>
                        {/*<Button 
                            m='2' 
                            height= {Dimensions.get('window').height/6}
                            flex= {1/2} 
                            onPress={() => navigation.navigate('Ingredients Exclusion')}
                        >
                            <Heading size='sm' textAlign='center' color='white'>
                                Ingredients Exclusion
                            </Heading>
                        </Button>*/}
                    </HStack>
                </VStack>
            </Box>
        </Center> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20,
        //alignItems: 'center', //align children components w.r.t the cross axis (y axis)
        justifyContent: 'center', // align childrem components w.r.t the main axis (x axis)
    },
    footPage: {
        width: '100%',
        height: 35, 
        position: 'absolute',
        bottom: 5,
    },
    titleInfo: {
        alignSelf: 'center',
    },
    subtitleInfo: {
        alignSelf: 'center',
        fontSize: 14, 
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(Profile);