import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeBaseProvider, Button, VStack, Box, Stack } from 'native-base'
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
            <Box>
                <View style={styles.containerInfo}>
                    <Title style={styles.titleInfo}>{user.name}</Title>
                    <Title style={styles.subtitleInfo}>{user.email}</Title>
                </View>
                <VStack style={styles.containerInfo}>
                    <Button onPress={() => navigation.navigate('Restrictions')}>
                        Setup Dietary Restrictions
                    </Button>
                    <Button mt='2' onPress={() => onLogout()}>
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