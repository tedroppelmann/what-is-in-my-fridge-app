import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper';

import {
    Box,
    Text,
    Heading,
    Button,
    FlatList,
    HStack,
    VStack,
    Input,
    Image,
    Center,
    ScrollView,
} from 'native-base';

export default function Landing({ navigation }) {
    return (
        <Center flex={1}>
            <Heading>
                Welcome!
            </Heading>
            <Button onPress={() => navigation.navigate('Register')}>
                Register
            </Button>
            <Button onPress={() => navigation.navigate('Login')}>
                Login
            </Button>
        </Center>
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