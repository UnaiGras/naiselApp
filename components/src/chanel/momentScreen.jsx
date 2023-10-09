import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useMutation } from '@apollo/client';
import { ADD_MOMENT_FILE } from './channelQuerys'



export const CameraComponent = ({ navigation, route }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [previewImage, setPreviewImage] = useState(null);
    const cameraRef = useRef(null);

    const [addMomentFile] = useMutation(ADD_MOMENT_FILE);

    const handleUpload = async (image) => {
        const data = new FormData();
        data.append("file", {
            uri: image,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });
        data.append("upload_preset", "slinepreset");
        data.append("cloud_name", "dasfna79h");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dasfna79h/image/upload", {
                method: "post",
                body: data
            });
            const resData = await response.json();
        setPreviewImage(resData.secure_url);

        // Llamada a la mutación para añadir el archivo a momentFiles:
        console.log({ 
            messageId: route.params.messageId, 
            imageUrl: resData.secure_url 
        })
        addMomentFile({ 
            variables: { 
                messageId: route.params.messageId, 
                imageUrl: resData.secure_url 
            } 
        });

        navigation.goBack()
        } catch (error) {
            console.log("Error uploading the image", error);
        }
    };

    const snap = async () => {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            handleUpload(photo.uri);
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }



    return (
        <View style={{ flex: 1 }}>
        { !previewImage &&
            <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <TouchableOpacity
                        style={{ flex: 0.1, bottom: 20, alignSelf: 'flex-end', alignItems: 'center', marginBottom: 20, backgroundColor: "white", padding: 20, borderRadius: 50 }}
                        onPress={snap}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Snap </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            }
            {previewImage && <Image source={{ uri: previewImage }} style={{ width: "100%", height: 300 }} />}
        </View>
    );
}
