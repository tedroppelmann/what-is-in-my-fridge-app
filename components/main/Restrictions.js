import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, View, Switch } from 'react-native'
import { NativeBaseProvider, Button, VStack, Box, HStack, Text } from 'native-base'
import { Title } from 'react-native-paper'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { getAuth, createUserWithEmailAndPassword }  from 'firebase/auth'
import { getFirestore, setDoc, getDoc, getDocs, doc, updateDoc, collection, query, where } from "firebase/firestore";

export class Restrictions extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            toggledGlutenFree : false,
            toggledVegan: false,

        }

        this.saveDietForLoggedUser = this.saveDietForLoggedUser.bind(this)
        this.setDiet = this.setDiet.bind(this)
    }

    setDiet(){
        // First create an array with all the diet restrictions depending on the enabled switches
        var diets = [];
        if(this.toggleSwitchGlutenFree == true){
            diets.push("Gluten Free");
        }else{
            console.log("Gluten Free switch not selected");
        }
        if(this.toggleSwitchVegan == true){
            diets.push("Vegan");
        }else{
            console.log("Vegan switch not selected");
        }

        // Second, returns a string separated by commas depending on the values added to the array
        var dietsToString = diets.toString();
        console.log("DietsToString: ", dietsToString);
        return dietsToString;
    }

    async saveDietForLoggedUser(){
        try{
            var userDocId = "";
            var userDoc;
            const db = getFirestore();
            //Get the firestore db
            const usersDb = collection(db, "Users");
            //Query the logged user from the firestore db
            const queryResult = query(usersDb, where("email", "==", "mellon1786@gmail.com")); // HOW DO YOU GET THE EMAIL FROM THE LOGGED ON USER?
            const querySnapshot = await getDocs(queryResult);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data())
                userDocId = doc.id
            });
            
            var diets = this.setDiet();
            console.log(diets);
            if (userDocId != "") {
                //Insert Diet for logged in user
                const userDoc = doc(db, 'Users', userDocId);
                await updateDoc(userDoc, { diets: diets }); // { fieldOnFirestore : reactVariable }
                console.log("Document updated: ", userDocId);
            } else {
                // doc.data() will be undefined in this case
                console.log("Empty Document ID. Update was not performed.");
            }
        }catch(error){
            console.log(error)
        }
    }

    toggleSwitchGlutenFree = (value) => {
        this.setState({toggledGlutenFree : value})
        console.log("toggleSwitchGlutenFreeValue", value)
    }
    toggleSwitchVegan = (value) => {
        this.setState({toggledVegan : value})
        console.log("toggleSwitchVeganValue", value)
    }

    render(){
        return (
            <NativeBaseProvider>
                <Box>
                    <VStack style={styles.containerInfo}>
                        <HStack style={styles.containerInfo} alignItems="center" space={8}>
                            <Text>{this.state.toggledGlutenFree? "Gluten Free (ON)" : "Gluten Free (OFF)"}</Text>
                            <Switch 
                                onValueChange={this.toggleSwitchGlutenFree}
                                value={this.state.toggledGlutenFree}
                            />
                        </HStack>
                        <HStack style={styles.containerInfo} alignItems="center" space={8}>
                            <Text>{this.state.toggledVegan? "Vegan (ON)" : "Vegan (OFF)"}</Text>
                            <Switch 
                                onValueChange={this.toggleSwitchVegan}
                                value={this.state.toggledVegan}
                            />
                        </HStack>
                        <HStack>
                            <Button mt='2' onPress={() => this.saveDietForLoggedUser()}>
                                Save Diets
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20,
    },
    footPage: {
        width: '100%',
        height: 35, 
        position: 'absolute',
        bottom: 5,
    },
    titleInfo: {
        alignSelf: 'center',
    },
    subtitleInfo: {
        alignSelf: 'center',
        fontSize: 14, 
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(Restrictions);