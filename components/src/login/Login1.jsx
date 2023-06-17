import { useMutation } from "@apollo/client";
import React, {useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet,Button } from "react-native";
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
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={text => setUsername(text)}
                  placeholderTextColor="#a565f2"
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeholderTextColor="#a565f2"
                  secureTextEntry
                />
                <Button title="Iniciar sesión" onPress={handleSubmit} color="#a565f2"  />
                <TouchableOpacity
                style={{
                  alignItems: "center",
                  marginTop: 20
                }}
                  onPress={() => {
                    navigation.navigate("Register")
                  }}
                >
                  <Text>Registrarse</Text>
                </TouchableOpacity>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#101010',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '80%',
    },
    input: {
      backgroundColor: '#191919',
      marginBottom: 20,
      paddingHorizontal: 10,
      height: 50,
      borderRadius: 8,
      fontSize: 20
    },
  });