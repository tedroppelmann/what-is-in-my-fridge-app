import React, { Component } from 'react'

import { getAuth, createUserWithEmailAndPassword }  from 'firebase/auth'
//import { getFirestore, setDoc, doc } from "firebase/firestore";
import FirebaseDb from '../main/Support/FirebaseDb'
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Center,
    Spinner,
} from 'native-base';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            credential_error: '',
            try_sign_up: false,
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    async setUserInFirestore(name, email){
        const fdb = new FirebaseDb()
        const initFdb = await fdb.initFirestoreDb()
        await fdb.insertNewUserDb(initFdb, getAuth().currentUser.uid, "Users", name, email)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        const auth = getAuth();
        //const db = getFirestore();
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                this.setUserInFirestore(name,email).then(() => {
                    console.log("Registered new user.")
                })
                /*setDoc(doc(db, 'Users', auth.currentUser.uid), {
                    name: name,
                    email: email,
                    favorites: [],
                  });*/
                console.log(result)
            })
            .catch((error) => {
                console.log(error.code)
                if (error.code == 'auth/invalid-email') {
                    this.setState({
                        credential_error: 'email',
                        try_sign_up: false,
                      })
                } else if (error.code == 'auth/weak-password') {
                    this.setState({
                        credential_error: 'weak-password',
                        try_sign_up: false,
                        })
                } else if (error.code == 'auth/email-already-in-use') {
                    this.setState({
                        credential_error: 'used-email',
                        try_sign_up: false,
                        })
                } else if (error.code == 'auth/internal-error') {
                    console.log("Internal Error")
                    this.setState({
                        credential_error: 'missing_password',
                        try_sign_up: false,
                        })
                } else {
                    console.log("Generic error")
                    this.setState({
                        credential_error: 'generic_error',
                        try_sign_up: false,
                        })
                }
            });
        this.setState({
            try_sign_up: true,
            });
    }

    render() {
        const { credential_error } = this.state;
        const { try_sign_up } = this.state;

        return (
            <Center flex={1}>
                <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
                    <Heading size='xl'>
                        Welcome
                    </Heading>
                    <Heading size="xs" mb='2'>
                        Sign up to continue!
                    </Heading>
                    {credential_error == 'email' ? (
                        <Heading size="xs" color='error.700'>
                        Invalid email. Please insert valid credentials.
                        </Heading>
                    ) : credential_error == 'weak-password' ? (
                        <Heading size="xs" color='error.700'>
                        Password too short. Please change it for a new one.
                        </Heading>
                    ) : credential_error == 'used-email' ? (
                        <Heading size="xs" color='error.700'>
                        You already have an account with this email.
                        </Heading>
                    ) : credential_error == 'missing_password' ? (
                        <Heading size="xs" color='error.700'>
                        Password is Empty. Fields with * are mandatory. Try again!
                        </Heading>
                    ) : credential_error == 'generic_error' ? (
                        <Heading size="xs" color='error.700'>
                        An error has ocurred. Try again!
                        </Heading>
                    ) : ''
                    }
                    <VStack space={3} mt="2">
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
                                Email*
                            </FormControl.Label>
                            <Input 
                                onChangeText={(email) => this.setState({ email })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>
                                Password*
                            </FormControl.Label>
                            <Input 
                                type="password"
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </FormControl>
                        <Button 
                            marginTop={3}
                            onPress={() => this.onSignUp()}
                        >
                            {try_sign_up ? 
                                <Spinner size='sm'color='white'/> :
                                <Heading size='sm' textAlign='center' color='white'>
                                    Sign up
                                </Heading>
                            }
                        </Button>
                    </VStack>
                </Box>
            </Center>
        )
    }
}

export default Register
