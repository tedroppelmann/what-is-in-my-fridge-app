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
        <Center flex={1} >
            <Box safeAreaTop flex={1} w="90%" mx="auto" alignItems='center'>
                <Box flex={1/2} justifyContent='center'>
                    <Heading size='xl'>
                        What's in my fridge?
                    </Heading>
                </Box>
                <Box  bottom='0' position='absolute' mb='10' flex={1} w="100%" mx="auto">
                    <Button
                        mb='5'
                        onPress={() => navigation.navigate('Register')}                        
                    >
                        <Heading size='sm' textAlign='center' color='white'>
                            Sign Up
                        </Heading>
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Heading size='sm' textAlign='center' color='white'>
                            Log In
                        </Heading>
                    </Button> 
                </Box>
            </Box>
        </Center>
    )
}
