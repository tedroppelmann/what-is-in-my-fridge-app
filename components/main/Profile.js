import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { 
    Button, 
    VStack, 
    Box, 
    Center
} from 'native-base'
import { Title } from 'react-native-paper'
import { getAuth }  from 'firebase/auth'
import { connect } from 'react-redux'

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
        <Center flex={1}>
            <Box flex={1} pt="3" w="95%" mx="auto">
                <View style={styles.containerInfo}>
                    <Title style={styles.titleInfo}>{user.name}</Title>
                    <Title style={styles.subtitleInfo}>{user.email}</Title>
                </View>
                <VStack style={styles.containerInfo}>
                    <Button size='lg' m='1' onPress={() => navigation.navigate('Dietary Restrictions')}>
                        Dietary Restrictions
                    </Button>
                    <Button size='lg' m='1' onPress={() => navigation.navigate('Intolerance Restrictions')}>
                        Intolerance Restrictions
                    </Button>
                    <Button size='lg' m='1' onPress={() => navigation.navigate('Ingredients Exclusion')}>
                        Ingredients Exclusion
                    </Button>
                    <Button safeAreaTop size='lg' m='1' colorScheme="danger" _text={{color: "white",}} onPress={() => onLogout()} >
                        Logout
                    </Button>
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