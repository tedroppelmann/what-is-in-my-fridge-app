import React from 'react'

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
            <Button onPress={() => navigation.navigate('Register')} mb='3'>
                Register
            </Button>
            <Button onPress={() => navigation.navigate('Login')}>
                Login
            </Button>
        </Center>
    )
}
