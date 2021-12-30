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
    Toast,
    Spinner,
} from 'native-base';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            credential_error: '',
            try_login: false,
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
                console.log(error.code)
                if (error.code == 'auth/invalid-email') {
                    this.setState({
                        credential_error: 'email',
                        try_login: false,
                      })
                } else if (error.code == 'auth/wrong-password') {
                    this.setState({
                        credential_error: 'password',
                        try_login: false,
                      })
                } else if (error.code == 'auth/user-not-found') {
                    this.setState({
                        credential_error: 'user-not-found',
                        try_login: false,
                      })
                }
            });
        this.setState({
            try_login: true,
            });
    }

    render() {
        const { credential_error } = this.state;
        const { try_login } = this.state;

        return (
            <Center flex={1}>
                <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
                    <Heading size='xl'>
                        Welcome
                    </Heading>
                    <Heading size="xs" mb='2'>
                        Sign in to continue!
                    </Heading>

                    {credential_error == 'email' ? (
                        <Heading size="xs" color='error.700'>
                        Invalidad email. Please insert valid credentials.
                        </Heading>
                    ) : credential_error == 'password' ? (
                        <Heading size="xs" color='error.700'>
                        Wrong password. Try again!
                        </Heading>
                    ) : credential_error == 'user-not-found' ? (
                        <Heading size="xs" color='error.700'>
                        User not found. Try again!
                        </Heading>
                    ) : ''
                    }
                    <VStack space={3} mt="2">
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
                        <Button 
                            marginTop={3}
                            onPress={() => this.onSignUp()}
                        >
                            {try_login ? 
                                <Spinner size='sm' color='white'/> :
                                <Heading size='sm' textAlign='center' color='white'>
                                    Log in
                                </Heading>
                            }
                        </Button>
                    </VStack>
                </Box>
            </Center>
        )
    }
}

export default Login
