import React from 'react'
import { StyleSheet, ImageBackground } from "react-native";
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

const image = require('../../storage/background2.jpeg');

export default function Landing({ navigation }) {
    return (
        <Center flex={1}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Box safeAreaTop flex={1} w="90%" mx="auto" alignItems='center'>
                    <Box flex={6/7} justifyContent='center' alignItems='center'>
                        <Heading size='4xl'  textAlign='center' italic>
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
            </ImageBackground>
        </Center>
    )
}

const styles = StyleSheet.create({
    
    image: {
      flex: 1,
      justifyContent: "center",
      width: '100%',
    },
    
  });