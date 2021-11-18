import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeBaseProvider, Button, VStack, Box, Image } from 'native-base'
import { Title } from 'react-native-paper'
import { getAuth }  from 'firebase/auth'
import { connect } from 'react-redux'
import { render } from 'react-dom'

function Profile(props) {
    const navigation = props.navigation;

    const [user, setUser] = useState(null);

    useEffect(() => {
        const { currentUser } = props;
        setUser(currentUser)
    })

    const onLogout = () => {
        getAuth().signOut();
    }

    if (user === null) {
        return <View></View>
    }

    return (   
        <NativeBaseProvider>
            <Box style={styles.container}>
                <View style={styles.containerInfo}>
                    <Title style={styles.titleInfo}>{user.name}</Title>
                    <Title style={styles.subtitleInfo}>{user.email}</Title>
                </View>
                <VStack style={styles.containerInfo}>
                    
                    <Button mt='2' onPress={() => navigation.navigate('DietRestrictions')}>
                        Dietary Restrictions
                    </Button>
                    {/*
                    <Image source={{uri: <img src="https://img.icons8.com/external-becris-flat-becris/64/000000/external-diet-literary-genres-becris-flat-becris.png"/>}} style={{width: 30, height: 30}} />
                    */}
                    <Button mt='2' onPress={() => navigation.navigate('IntoleranceRestrictions')}>
                        Intolerance Restrictions
                    </Button>
                    <Button mt='2' onPress={() => navigation.navigate('IngredientsExclusion')}>
                        Ingredients Exclusion
                    </Button>
                    {/*
                    <Image source={{uri: "https://img.icons8.com/external-sbts2018-flat-sbts2018/50/000000/external-logout-social-media-sbts2018-flat-sbts2018.png"}} style={{width: 30, height: 30}}/>
                    */}
                    <Button mt='2' colorScheme="danger" _text={{color: "white",}} onPress={() => onLogout()} >
                        Logout
                    </Button>
                </VStack>
            </Box>
        </NativeBaseProvider>
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