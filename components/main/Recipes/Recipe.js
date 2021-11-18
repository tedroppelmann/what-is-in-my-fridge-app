import React, { useState, useEffect } from 'react'
import { ActivityIndicator} from 'react-native'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
import {
    NativeBaseProvider,
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
} from 'native-base';

export default function Recipe({ navigation, route }) {

    return (
        <NativeBaseProvider>
            <Text>{route.params.recipe_title}</Text>
        </NativeBaseProvider>
    )
}
