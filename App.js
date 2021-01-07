import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import DragButton from './DragButton'
import { Entypo } from '@expo/vector-icons'

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is a cube, Dragg it around!</Text>
            <Entypo name="arrow-long-down" style={styles.text} />
            <DragButton />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#c2c2c2',
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
    },
    arrow: {
        color: '#ebebeb',
        paddingBottom: 20,
    },
})

export default App
