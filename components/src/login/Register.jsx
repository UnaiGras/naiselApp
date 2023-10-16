import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import { REGISTER } from "./loginQueries";
import * as ImagePicker from 'expo-image-picker'
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from 'formik';
import * as yup from 'yup';




const registerSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().email('Correo electrónico no válido').required('El correo electrónico es requerido'),
    username: yup.string().required('El nombre de usuario es requerido'),
    password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es requerida'),
    phone: yup.string().required('El número de teléfono es requerido'),
});
 


export default function Register({navigation}) {
    const [image, setImage] = useState('')
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
            navigation.navigate('EmailVerificationScreen', {username: formik.values.username})
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

    
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            username: '',
            password: '',
            phone: ''
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            addUser({
                variables: 
                {
                    profilePhoto: image,
                    username: values.username, 
                    password: values.password,
                    name: values.name,
                    email: values.email
                }
            });
        }
    });


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
                                <Ionicons name="image" size={200} color="gray"/>
                            </View>
                         }
                         { image &&
                            <View style= { { borderRadius: 100}}>
                                <Image  style={{
                                    alignSelf: 'center', 
                                    height: 200, 
                                    width: 200, 
                                    borderRadius: 100
                                }} source={{uri: image}}></Image>
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
                            value={formik.values.name}
                            onChangeText={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            placeholder="Tu Nombre"
                            placeholderTextColor="white"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <Text style={styles.error}>{formik.errors.name}</Text>
                        ) : null}

                        <TextInput
                            style={styles.input}
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            placeholder="Email"
                            placeholderTextColor="white"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Text style={styles.error}>{formik.errors.email}</Text>
                        ) : null}

                        <TextInput
                            style={styles.input}
                            value={formik.values.username}
                            onChangeText={formik.handleChange('username')}
                            onBlur={formik.handleBlur('username')}
                            placeholder="Username"
                            placeholderTextColor="white"
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <Text style={styles.error}>{formik.errors.username}</Text>
                        ) : null}

                        <TextInput
                            style={styles.input}
                            value={formik.values.password}
                            onChangeText={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                            placeholder="Password"
                            secureTextEntry
                            placeholderTextColor="white"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <Text style={styles.error}>{formik.errors.password}</Text>
                        ) : null}

                        <TextInput
                            style={styles.input}
                            value={formik.values.phone}
                            onChangeText={formik.handleChange('phone')}
                            onBlur={formik.handleBlur('phone')}
                            placeholder="Número"
                            placeholderTextColor="white"
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <Text style={styles.error}>{formik.errors.phone}</Text>
                        ) : null}
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={formik.handleSubmit}
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
        color: 'white',
        borderRadius: 8,
        padding: 10,
        marginTop: 25,
        width: "90%",
        alignSelf: "center",
        borderWidth: 0.5,  // Añade un borde sutíl
        borderColor: '#333'
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
        color: '#FF3B30',  // Color estándar de error en iOS
        paddingLeft: 10,  // Añade algo de padding para el mensaje de error
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#a565f2',
        borderWidth: 1, 
        borderColor: '#a565f2',
        marginVertical: 30,
        borderRadius: 15,
        width: "80%",
        alignSelf: "center",
        shadowColor: "#a565f2",
        shadowOffset: {
            width: 3,
            height: 7,
        },
        shadowOpacity: 0.90,
        shadowRadius: 5.00,
        elevation: 5,
    }
}) 