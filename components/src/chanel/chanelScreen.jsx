import React, {useState, useRef} from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GET_CHANEL, ME } from './channelQuerys';
import { useQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { SEND_NEW_MESSAGE } from './channelQuerys';
import { LinearGradient } from 'expo-linear-gradient';

export const ChannelScreen = ({navigation, route }) => {

    const {planId} = route.params
    const {creatorId} = route.params
    console.log({
        creatorId: creatorId
    })
    const [chanelInfo, setChanelInfo] = useState(null)
    const [messageToSend, setMessageToSend] = useState("");
    const [contentUrl, setContentUrl] = useState("")
    const [isCreator, setIsCreator] = useState(false)
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [eventMessage, setEventMessage] = useState("");

    const [lineWidth, setLineWidth] = useState(new Animated.Value(0)); // Para la línea
    const fadeAnim = useRef(new Animated.Value(0)).current; // Para la animación de fade in/out


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
            setChanelInfo(data.chanelInfo);
            const eventMessageFound = data.chanelInfo?.messages?.find(msg => msg.messageType === 'event');
            console.log(eventMessageFound, "<<<.----- este es el eventMessageFound")
            if (eventMessageFound) {
                setEventMessage(eventMessageFound.content)
                setShowEventPopup(true)
                // Fade in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }).start();
    
                // Animar línea
                Animated.timing(lineWidth, {
                    toValue: 1,
                    duration: 5000,
                    useNativeDriver: false
                }).start();
    
                setTimeout(() => {
                    // Fade out
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true
                    }).start(() => setShowEventPopup(false));
                }, 5000);
            }
        }
    }, [data]);
    

    useEffect(() => {
        if (mydata) {
            console.log("my id:", mydata.me.id)
            if (creatorId === mydata.me.id) {
                setIsCreator(true)
            }else {
                console.log("No eres el creador de este canal")
            }
        }
    }, [mydata])

    const MessageRenderer = ({ item }) => {
        if (item.messageType === 'basic') {
            return (
                <LinearGradient
                colors={["#191919", "#a565f2"]} 
                style={styles.messageContainer}>
                    <Text style={styles.messageContent}>{item.content}</Text>
                </LinearGradient>
            );
        }
    
        if (item.messageType === 'photo') {
            return (
                <LinearGradient
                colors={["#191919", "#a565f2"]}
                style={styles.messageContainer}>
                    <Image source={{ uri: item.messageImage }} style={styles.messageImage} />
                    <Text style={styles.messageContent}>{item.content}</Text>
                </LinearGradient>
            );
        }

        if (item.messageType === 'event') {
            return (
                <View style={styles.eventMessage}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>
                        {item.content}
                    </Text>
                </View>
            );
        }
    
        return null;
    };

    return (
        <>
        { showEventPopup && 
                        <Animated.View style={{ 
                            position: 'absolute', 
                            top: 140, // Ajusta según la altura de tu header
                            left: 0,
                            right: 0,
                            alignItems: 'center',
                            zIndex: 1000, 
                            opacity: fadeAnim,
                            padding: 20, // Para darle espacio alrededor del pop-up
                        }}>
                            <View style={{ 
                                backgroundColor: '#212121',
                                padding: 15,
                                borderRadius: 15,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                width: '100%', // Para que el pop-up no sea demasiado ancho
                            }}>
                                <Text style={{ 
                                    fontSize: 18, 
                                    fontWeight: 'bold', 
                                    color: 'white', 
                                    textAlign: 'center'
                                }}>
                                    {eventMessage}
                                </Text>
                                <Animated.View style={{
                                    height: 4,
                                    backgroundColor: '#a565f2',
                                    marginTop: 10,
                                    width: lineWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '100%']
                                    })
                                }} />
                            </View>
                        </Animated.View>
                                    }
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
                        <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor: "#202020", padding: 10, marginBottom: 20, borderRadius: 20 }}>
                            <View style={{ flex: 1, borderRadius: 5 }}>
                                 {contentUrl ? (
                                     <Image source={{ uri: contentUrl }} style={{ width: "100%", height: 300, borderRadius: 10 }} />
                                 ) : null}
                                 <TextInput
                                     style={{ color:"white", fontSize: 18, maxHeight: 100, width: "100%" }}
                                     value={messageToSend}
                                     onChangeText={setMessageToSend}
                                     placeholder="Escribe tu mensaje..."
                                     multiline
                                 />
                             </View>
                        {!contentUrl &&
                       <TouchableOpacity onPress={pickMedia} style={{ padding: 10, backgroundColor: '#a565f2', marginLeft: 10, borderRadius: 15 }}>
                       <Ionicons name="image" size={30} color={contentUrl ? "#101010" : "#101010"} />

                       </TouchableOpacity>
                       }
                       <TouchableOpacity 
                           style={{ padding: 10, backgroundColor: '#a565f2', marginLeft: 10, borderRadius: 10, height: 50, justifyContent: "center" }}
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
        backgroundColor: '#191919',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        alignSelf: "flex-start",
        maxWidth: 290
    },
    messageSender: {
        color: 'white',
        fontWeight: 'bold',
    },
    messageContent: {
        color: 'white',
        fontWeight: "500",
        fontSize: 15,
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
    eventMessage: {
        padding: 5, 
        borderWidth: 0.5, 
        backgroundColor: "#191919",
        borderColor: '#a565f2', 
        borderRadius: 15,
        minHeight: 40,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#a565f2",
        shadowOffset: {
            height: 4,
            width: 2
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
    },
    messageImage: {
        height: 300,
        width: 270,
        borderRadius: 10
    }
});


