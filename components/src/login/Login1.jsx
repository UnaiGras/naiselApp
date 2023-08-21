import { useMutation } from "@apollo/client";
import React, {useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet,Button, Image } from "react-native";
import { LOGIN } from "./loginQueries";
import { TouchableOpacity } from "react-native-gesture-handler";
//hacer las querys para representar las paginas de usuario

export default function Login1({navigation, setToken}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: error => {
            console.log(error)
        }
    })


    useEffect(() => {
        if(result.data){
            const {value: token} = result.data.login
            setToken(token)
            
        }
    }, [result.data])


    const handleSubmit = () => {
        console.log({username, password})
        login({
            variables: {
                username: username, 
                password: password
            }
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.formContainer}>
              <Image 
              source={require("../../../assets/logo.png")}
              style={{
                width: 170,
                height: 170,
                marginBottom: 2,
                alignSelf: "center",
                borderRadius: 20
              }}
              />
              <Text style={styles.naisel}>NaiselApp</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={text => setUsername(text)}
                  placeholder="Username"
                  placeholderTextColor="gray"
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeholderTextColor={"gray"}
                  placeholder="Password"
                  secureTextEntry
                />
                <Button title="Iniciar sesión" onPress={handleSubmit} color="#a565f2"  />
                <TouchableOpacity
                style={{
                  alignItems: "center",
                  marginTop: 20,
                }}
                  onPress={() => {
                    navigation.navigate("Register")
                  }}
                >
                  <Text style={{color: "white"}}>Registrarse</Text>
                </TouchableOpacity>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#151515',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '80%',
      padding: 20,
      paddingVertical: 30,
      borderRadius: 20,
      backgroundColor: "#101010",
      shadowColor: "#a565f2",
      elevation: 10
    },
    input: {
      backgroundColor: '#191919',
      marginBottom: 20,
      paddingHorizontal: 10,
      height: 50,
      borderRadius: 8,
      fontSize: 20,
      color: "white"
    },
    naisel: {
      fontSize: 18,
      fontWeight: "700",
      alignSelf: "center",
      marginBottom: 20,
      color: "white"
    }
  });