import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import { REGISTER } from "./loginQueries";
import * as ImagePicker from 'expo-image-picker'
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
 


export default function Register({navigation}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')

    const [addUser, result] = useMutation(REGISTER, {
        onError: error => {
            console.log(error)
        }
    })

    const pickImage = async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.7,
          });
      
          console.log(result.assets[0]);
      
          if (!result.canceled) {
                let newfile = {
                    uri: result.assets[0].uri, 
                    type: `test/${result.assets[0].uri.split(".")[1]}`,
                    name:`test.${result.assets[0].uri.split(".")[1]}`
                }
                handleUpload(newfile)

    }}


    useEffect(() => {
        if(result.data){
            console.log(result.data)
            navigation.navigate('Home')
        }
    }, [result.data])

    const handleUpload = (image) => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset","slinepreset" )
        data.append("cloud_name", "dasfna79h")
    
        fetch("https://api.cloudinary.com/v1_1/dasfna79h/image/upload", {
            method:"post",
            body: data
        }).then(res =>res.json()).
        then(data=>{
            console.log(data)
            setImage(data.secure_url)
        })
        
    }


    const handleSubmit = () => {
        console.log({username, password, name, email})
        addUser({
        variables: 
        {
            profilePhoto: image,
            username: username, 
            password: password,
            name: name,
            email: email
        
        }
    })
    }
    
    //const validateEmail = (email) => {
    //    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //    if (!email.match(regex)) {
    //      setError('Dirección de correo electrónico no válida');
    //      return false;
    //    }
    //    setError('');
    //    return true;
    //  };
//
    ////	^([a-zA-Z0-9@*#]{8,15})$
//
    //const validatePsswd = (email) => {
    //    const regex = /^([a-zA-Z0-9@*#]{8,22})$/;
    //    if (!email.match(regex)) {
    //      setError('Contraseña no valida');
    //      return false;
    //    }
    //    setError('');
    //    return true;
    //  };


    return(

            <ScrollView style={{
                    height: '100%',
                    backgroundColor: 'black'
                }}>

                    <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
                         <TouchableOpacity
                         style={{backgroundColor: '#191919', borderRadius: 100}}
                         onPress={pickImage}
                         >

                         {!image &&
                            <View style= { { borderRadius: 100}}>
                                <Ionicons name="image" size={200}/>
                            </View>
                         }
                         { image &&
                            <View style= { { borderRadius: 100}}>
                                <Image  style={{alignSelf: 'center', height: 200, width: 200, borderRadius: 100}} source={{uri: image}}></Image>
                            </View>

                         }
                         </TouchableOpacity>
                
                    </View>
                    
                    <View style={{
                        marginVertical: 40,
                        paddingHorizontal: 40

                    }}>

                    <TextInput
                        style={styles.input}
                        value={name}
                        placeholder="Tu Nombre"
                        onChangeText={text => setName(text)}
                        />

                    <TextInput
                        style={styles.input}
                        value={email}
                        placeholder="email"
                        onChangeText={text => setEmail(text)}
                        />

                    <TextInput
                        style={styles.input}
                        value={username}
                        placeholder="Username"
                        onChangeText={text => setUsername(text)}
                        />

                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                        />
                    <TextInput
                        style={styles.input}
                        value={phone}
                        placeholder="Numero"
                        onChangeText={text => setPhone(text)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                        >
                            <Text style={{
                                padding: 10,
                                fontSize: 14, 
                                fontStyle: 'italic', 
                                fontWeight: '700'

                            }}>
                                REGISTER
                            </Text>
                    </TouchableOpacity>
            </ScrollView>
                )
                        }



const styles = StyleSheet.create({

    input: {
        backgroundColor: '#151515',
        color: '#ffffff',
        borderRadius: 8,
        padding: 10,
        marginTop: 25,
        width: "90%",
        alignSelf: "center"
    },
    layout: {
        backgroundColor: 'black',
        paddingVertical: 100,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 40,
        shadowColor: "#00c1b9",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.70,
        shadowRadius: 18.00,

        elevation: 40,

    },
    error: {
        color: 'red',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#00c1b9',
        marginVertical: 30,
        borderRadius: 15,
        width: "80%",
        alignSelf: "center",
        shadowColor: "#00c1b9",
        shadowOffset: {
            width: 30,
            height: 15,
        },
        shadowOpacity: 0.90,
        shadowRadius: 24.00,

        elevation: 20,
    }
}) 