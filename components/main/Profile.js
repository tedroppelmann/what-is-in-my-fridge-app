import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { Title } from 'react-native-paper';

import { getAuth }  from 'firebase/auth'

import { connect } from 'react-redux'

function Profile(props) {
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
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Title style={styles.titleInfo}>{user.name}</Title>
                <Title style={styles.subtitleInfo}>{user.email}</Title>
                <Button 
                    title="Configure Dietary Restrictions"
                    onPress={() => navigation.navigate('Restrictions')}
                />
            </View>
            <View style={styles.footPage}>
                <Button 
                    style={styles.footPage}
                    title="Logout"
                    onPress={() => onLogout()}
                />
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    footPage: {
        alignSelf: 'flex-end',
    },
    titleInfo: {
        alignSelf: 'center',
    },
    subtitleInfo: {
        alignSelf: 'center',
        fontSize: 11,
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(Profile);