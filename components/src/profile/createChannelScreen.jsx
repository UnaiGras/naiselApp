import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_CHANNEL_MUTATION } from './gestionQuerys';  // Asume que tienes esta mutación definida en otro lugar
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
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
            navigation.goback()
        }
    }, [data])

    return (
        <View style={styles.container}>
        {image ? (
                <Image source={{ uri: image }} style={styles.channelImage} />
            ) : (
                <Button
                    title="Elegir imagen del canal"
                    onPress={pickImage}
                    icon={
                        <Ionicons name="md-images" size={24} color="white" />
                    }
                />
            )}
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Nombre del Canal"
            />
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Descripción del Canal"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Crear Canal</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101010',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        width: '80%',
        color: 'white',
    },
    channelImage: {
        width: 200,
        height: 200,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#a565f2',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        width: "80%",
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
