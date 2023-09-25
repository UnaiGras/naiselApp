import React, {useState} from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GET_CHANEL, ME } from './channelQuerys';
import { useQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { SEND_NEW_MESSAGE } from './channelQuerys';

export const ChannelScreen = ({navigation, route }) => {

    const {planId} = route.params
    const {creatorId} = route.params
    const [chanelInfo, setChanelInfo] = useState(null)
    const [messageToSend, setMessageToSend] = useState("");
    const [contentUrl, setContentUrl] = useState("")
    const isCreator = true

    const { loading, error, data } = useQuery(GET_CHANEL, {
        variables: {
            creatorId: creatorId
        },
        onError: err => {
            console.log(err)
        }
    });

    const {data: mydata} = useQuery(ME)

    const [sendNewMessage, {data: messageResponse}] = useMutation(SEND_NEW_MESSAGE, {
        onError: err => {
            console.log(err)
        }
    })

    const pickMedia = async () => {
        const options = {
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.7
        };
        
        const result = await ImagePicker.launchImageLibraryAsync(options);
    
        if (!result.canceled) {
          let newfile = {
            uri: result.uri, 
            type: `test/${result.uri.split(".")[1]}`,
            name: `test.${result.uri.split(".")[1]}`
          }
          handleUpload(newfile);
        }
      };
    
      const handleUpload = (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset","slinepreset");
        data.append("cloud_name", "dasfna79h");
    
        fetch("https://api.cloudinary.com/v1_1/dasfna79h/image/upload", {
          method: "post",
          body: data
        })
        .then(res => res.json())
        .then(data => {
          setContentUrl(data.secure_url);
        })
      };

    const ChannelHeader = () => {
        return (
            <View style={styles.channelHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.channelInfo}>
                        <TouchableOpacity onPress={() => navigation.navigate('ChannelDetailScreen', { channel: chanelInfo, creatorId: creatorId })}>
                            <Text style={styles.channelName}>{chanelInfo.name}</Text>
                            <Text style={styles.channelMsgCount}>{chanelInfo.messages.length} mensajes</Text>
                        </TouchableOpacity>
                </View>
                <Image source={{ uri: chanelInfo.photo }} style={styles.channelImage} />
                
            </View>
        )
    };

    const goToModel = () => {
        navigation.navigate("ChatScreen", {
            planId: planId
        })
    }

    useEffect(() => {
        if (data) {
            setChanelInfo(data.chanelInfo)
            console.log(data)
            console.log(chanelInfo?.messages)
        }
    }, [data])

    const MessageRenderer = ({ item }) => {
        if (item.messageType === 'basic') {
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.messageContent}>{item.content}</Text>
                </View>
            );
        }
    
        if (item.messageType === 'photo') {
            return (
                <View style={styles.messageContainer}>
                    <Image source={{ uri: item.messageImage }} style={styles.messageImage} />
                    <Text style={styles.messageContent}>{item.content}</Text>
                </View>
            );
        }
    
        return null;
    };

    return (
        <>
            <View style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={{ flex: 1 }}
            >
                { chanelInfo &&
                <>
                    <ChannelHeader/>
                    <View style={{ flex: 1 }}>
                        {chanelInfo.messages?.length > 0 ? (
                                <FlatList
                                    data={chanelInfo.messages}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => <MessageRenderer item={item} />}
                                />
                            ) : (
                                <View style={styles.noChatsContainer}>
                                    <Ionicons name="chatbubbles-outline" size={100} color="gray"/>
                                    <Text style={styles.noChatsText}>Parece que este canal no tiene ningún mensaje!!</Text>
                                    <Text style={styles.noChatsText}>Explora con quién puedes hablar.</Text>
                                </View>
                            )}
                    </View>

                    {!isCreator ? (
                        <TouchableOpacity style={styles.floatingButton} onPress={goToModel}>
                            <Ionicons name="chatbubble-ellipses-outline" size={32} color="white" />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor: "#171717", padding: 5, marginBottom: 10, borderRadius: 10 }}>
                            <View style={{ alignItems: 'center', flex: 1, borderRadius: 5 }}>
                                 {contentUrl ? (
                                     <Image source={{ uri: contentUrl }} style={{ width: "100%", height: 300, borderRadius: 10 }} />
                                 ) : null}
                                 <TextInput
                                     style={{ color:"white", fontSize: 18, height: 100, width: "100%" }}
                                     value={messageToSend}
                                     onChangeText={setMessageToSend}
                                     placeholder="Escribe tu mensaje..."
                                     multiline
                                 />
                             </View>
                        {!contentUrl &&
                       <TouchableOpacity onPress={pickMedia} style={{ padding: 10, backgroundColor: '#8a2be2', marginLeft: 10, borderRadius: 15 }}>
                       <Ionicons name="image" size={30} color={contentUrl ? "#8a2be2" : "gray"} />

                       </TouchableOpacity>
                       }
                       <TouchableOpacity 
                           style={{ padding: 10, backgroundColor: '#a565f2', marginLeft: 10, borderRadius: 5 }}
                           onPress={() => {

                               console.log({
                                message: messageToSend, 
                                    messageType: contentUrl ? "photo" : "basic",
                                    messageImage: contentUrl
                               })
                              
                               sendNewMessage({ 
                                   variables: { 
                                    message: messageToSend, 
                                    messageType: contentUrl ? "photo" : "basic",
                                    messageImage: contentUrl 
                                   } 
                               })
                               setMessageToSend("");
                               setContentUrl("") // Reset the image
                           }}
                       >
                           <Text style={{ color: 'white' }}>Enviar</Text>
                       </TouchableOpacity>
                        </View>
                    )}

                </>
                }
                </KeyboardAvoidingView>
            </View>
        </>
    );
}
    
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101010',
        padding: 16,
    },
    name: {
        fontSize: 24,
        color: 'white',
    },
    messageContainer: {
        backgroundColor: '#151515',
        padding: 8,
        borderRadius: 8,
        marginVertical: 4,
    },
    messageSender: {
        color: 'white',
        fontWeight: 'bold',
    },
    messageContent: {
        color: 'white',
    },
    floatingButton: {
        bottom: 16,
        backgroundColor: '#a565f2',
        borderRadius: 30,
        paddingVertical: 4,
        alignItems: "center",
        elevation: 8,
        shadowColor: "#a565f2",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
    },
    channelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: "#191919",
        borderRadius: 20,
        marginTop: 40
    },
    channelImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    channelInfo: {
        flex: 1,
        alignItems: "center"
    },
    channelName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    channelMsgCount: {
        color: 'white',
        fontSize: 12,
    },
    noChatsText: {
        color: "gray",

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#151515',
        borderTopWidth: 1,
        borderTopColor: '#a565f2',
    },
    input: {
        flex: 1,
        backgroundColor: '#101010',
        color: 'white',
        paddingHorizontal: 16,
        borderRadius: 8,
    },
});


