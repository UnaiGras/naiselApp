import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_CHANNEL_MUTATION } from './gestionQuerys';  // Asume que tienes esta mutación definida en otro lugar
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CreateChannelScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const [createChannel, { 
        data, 
        loading, 
        error 
    }] = useMutation(CREATE_CHANNEL_MUTATION);

    const handleSubmit = () => {
        createChannel({ variables: { name, description, image } });
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.7,
        });
  
        console.log(result.assets[0]);
  
        if (!result.cancelled) {
            let newfile = {
                uri: result.assets[0].uri, 
                type: `test/${result.assets[0].uri.split(".")[1]}`,
                name:`test.${result.assets[0].uri.split(".")[1]}`
            }
            handleUpload(newfile)
        }
    }

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

    useEffect(() => {
        if (data){
            console.log(data)
            navigation.goBack()
        }
    }, [data])

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 70}
            enabled
        >

            <View style={styles.card}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.channelImage} />
                ) : (
                    <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                        <Ionicons name="md-images" size={24} color="white" />
                        <Text style={styles.imageButtonText}>Elegir imagen del canal</Text>
                    </TouchableOpacity>
                )}
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Nombre del Canal"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.inputDesc}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Descripción del Canal"
                    placeholderTextColor="#aaa"
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Crear Canal</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
    },
    card: {
        backgroundColor: '#202020',
        padding: 20,
        borderRadius: 10,
        width: '85%',
        alignItems: 'center',
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#404040',
        padding: 16,
        borderRadius: 8,
        marginBottom: 66,
        marginVertical: 50
    },
    imageButtonText: {
        color: 'white',
        marginLeft: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        width: '100%',
        color: 'white',
        borderRadius: 8,
        backgroundColor: "#191919"
    },
    channelImage: {
        width: 300,
        height: 300,
        marginBottom: 12,
        borderRadius: 30,
    },
    button: {
        backgroundColor: '#a565f2',
        padding: 16,
        borderRadius: 8,
        width: "100%",
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputDesc: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        width: '100%',
        color: 'white',
        borderRadius: 8,
        backgroundColor: "#191919"
    }
})