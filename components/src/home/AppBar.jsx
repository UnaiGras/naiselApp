import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons'


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "90%",
        backgroundColor: "#252525",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 20,
        paddingVertical: 10,
        marginBottom: 30
    },
    button: {
        alignItems: "center",
    },
    text: {
        fontSize: 10,
        color: "white"
    }
})


const AppBar = ({data, navigation, position}) => {
    console.log(position, "esta es la posicion")
    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                        navigation.navigate('Search')
                    }}
                >
                {position === "search" ? (
                <Ionicons name="search" size={25} />
                ):(
                <Ionicons name="search-outline" size={25} color="white" />
                )}
                <Text style={styles.text}>Buscar</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                        navigation.navigate('Inbox', {maker: data.me.planMaker})
                    }}
                >
                {position === "Inbox" ? (
                <Ionicons name="mail" size={25} color="#a565f2"/>
                ):(
                <Ionicons name="mail-outline" size={25} color="white" />
                )}
                <Text style={styles.text}>Bandeja</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                {position === "home" ? (
                <Ionicons name="home" size={25} color="#a565f2"/>
                ):(
                <Ionicons name="home-outline" size={25}/>
                )}
                <Text style={styles.text}>Home</Text>

            </TouchableOpacity>
            <TouchableOpacity  
            style={styles.button}
                onPress={ () => {
                navigation.navigate('ProfileScreen')
                }}>
                {data ? (
                    <Image 
                        source={{uri: data.me.profilePhoto}} 
                        style={{
                            height: 35,
                            width: 35,
                            borderRadius: 49,
                        }}
                        />
                    ) : (
                        <Ionicons name='person-circle-outline' size={35}/>
                        
                    )}
                    <Text style={styles.text}>Perfil</Text>
            </TouchableOpacity>
      </View>
        

    )
}
export default AppBar