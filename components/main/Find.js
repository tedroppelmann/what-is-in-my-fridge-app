import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { Title } from 'react-native-paper';

export default function Find() {
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Title style={styles.titleInfo}>Which ingredients do you have?</Title>
            </View>
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


