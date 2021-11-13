import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, View, Switch } from 'react-native'
import { NativeBaseProvider, Button, VStack, Box, HStack, Text } from 'native-base'
import { Title } from 'react-native-paper'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { getAuth, createUserWithEmailAndPassword }  from 'firebase/auth'
import { getFirestore, setDoc, getDoc, getDocs, doc, updateDoc, collection, query, where } from "firebase/firestore";

export class TestRestrictions extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            diets: [
                {
                    id: 1,
                    name: 'Gluten Free',
                    slug: 'Gluten-Free',
                    toggle: false,
                    url: 'https://image.freepik.com/vector-gratis/racimo-platano-amarillo-maduro-vector-aislado-sobre-fondo-blanco_1284-45456.jpg',
                },
                {
                    id: 2,
                    name: 'Vegan',
                    slug: 'Vegan',
                    toggle: false,
                    url: 'https://www.maxpixel.net/static/photo/1x/Tomatoes-Vegetables-Ripe-Healthy-Vegetarian-Food-5412517.png',
                },
            ],
        }

        this.saveDietForLoggedUser = this.saveDietForLoggedUser.bind(this)
        this.setDiet = this.setDiet.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
    }

    setDiet(){
        var selectedDiets = [];
        var i=0;
        this.state.diets.forEach(() => {
            if(this.state.diets[i].toggle){
                selectedDiets.push(this.state.diets[i].name);
                console.log(this.state.diets[i].name," was selected.");
            }else{
                console.log(this.state.diets[i].name," was not selected.");
            }
            i++;
        })
        var selectedDietsToString = selectedDiets.toString();
        console.log("Diets parsed to string: ", selectedDietsToString);
        return selectedDietsToString; 
    }

    async saveDietForLoggedUser(){
        try{
            var userDocId = "";
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

    toggleSwitch = (i) => (event) => {
        this.setState((state, props) => {
          state.diets[i].toggle = !state.diets[i].toggle;
          console.log(state.diets[i].name, " toggled.")
          return {
            diets: state.diets
          }
        })
    }
    
    render(){
        const { diets } = this.state
        const dietJSX = []   
        var i=0;    
        diets.forEach((diet) => {
            dietJSX.push(
                <HStack  key={i} style={styles.containerInfo} alignItems="center" space={8}>
                    <Text> {diet.name} </Text>
                    <Switch
                        key={i*1000} 
                        onValueChange={this.toggleSwitch(i)}
                        value={diet.toggle}
                    />
                </HStack>
            )
            i++;
        })

        return (
            <NativeBaseProvider>
                <Box>
                    <VStack style={styles.containerInfo}>
                        {dietJSX}
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

export default connect(mapStateToProps, null)(TestRestrictions);