import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Feed() {
    
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>Feed</Text>
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