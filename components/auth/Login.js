import React, { Component } from 'react'

import { getAuth, signInWithEmailAndPassword }  from 'firebase/auth'

import {
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    Center,
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
            <Center flex={1}>
                <Box w="90%" >
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
                                size="lg"
                                onChangeText={(email) => this.setState({ email })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>
                                Password
                            </FormControl.Label>
                            <Input 
                                size="lg"
                                type="password"
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </FormControl>
                        <Button onPress={() => this.onSignUp()}>
                            Sign in
                        </Button>
                    </VStack>
                </Box>
            </Center>
        )
    }
}

export default Login
