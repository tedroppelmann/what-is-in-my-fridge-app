import React, { Component } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

import { getAuth, signInWithEmailAndPassword }  from 'firebase/auth'

import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    IconButton,
    HStack,
    Divider,
} from 'native-base';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)

            });
    }

    render() {
        return (
            <NativeBaseProvider>
                <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
                    <Heading size='xl'>
                        Welcome
                    </Heading>
                    <Heading size="xs">
                        Sign in to continue!
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>
                                Email
                            </FormControl.Label>
                            <Input 
                                onChangeText={(email) => this.setState({ email })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>
                                Password
                            </FormControl.Label>
                            <Input 
                                type="password"
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </FormControl>
                        <Button onPress={() => this.onSignUp()}>
                            Sign in
                        </Button>
                    </VStack>
                </Box>
            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
  });

export default Login
