import React, { Component } from 'react'
import { View, TextInput } from 'react-native'

import { getAuth, createUserWithEmailAndPassword }  from 'firebase/auth'
import { getFirestore, setDoc, doc } from "firebase/firestore";

import {
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
    Center,
} from 'native-base';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        const auth = getAuth();
        const db = getFirestore();
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setDoc(doc(db, 'Users', auth.currentUser.uid), {
                    name: name,
                    email: email,
                  });
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <Center flex={1}>
                <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
                    <Heading size='xl'>
                        Welcome
                    </Heading>
                    <Heading size="xs">
                        Sign up to continue!
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>
                                Name
                            </FormControl.Label>
                            <Input 
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </FormControl>
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
                            Sign up
                        </Button>
                    </VStack>
                </Box>
            </Center>
        )
    }
}

export default Register
