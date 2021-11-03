import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Title } from 'react-native-paper';

export default function Landing({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Title style={styles.titleInfo}>Welcome!</Title>
            <Button title='Register'
            onPress={() => navigation.navigate('Register')}
            />
            <Button title='Login'
            onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        marginTop: 80,
        margin: 25
    },
    titleInfo: {
        alignSelf: 'center',
    }
})