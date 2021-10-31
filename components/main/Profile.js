import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'

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
                <Text>Nombre: {user.name}</Text>
                <Text>Email: {user.email}</Text>
                <Button
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
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(Profile);