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
    Modal,
    Animated,
    Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GET_CHANEL, ME } from './channelQuerys';
import { useQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { SEND_NEW_MESSAGE } from './channelQuerys';
import { CREATE_MOMENT } from './channelQuerys';

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
    const [isModalVisible, setModalVisible] = useState(false);
    const [momentMessage, setMomentMessage] = useState("");

    const [lineWidth, setLineWidth] = useState(new Animated.Value(0)); // Para la línea
    const fadeAnim = useRef(new Animated.Value(0)).current; // Para la animación de fade in/out
    const flatListRef = useRef(null);


    const { loading, error, data } = useQuery(GET_CHANEL, {
        variables: {
            creatorId: creatorId
        },
        onError: err => {
            console.log(err)
        }
    });

    const {data: mydata} = useQuery(ME)

    const [createMoment, { data: response }] = useMutation(CREATE_MOMENT, {
        onError: err => {
            console.log(
                err.message, 
                err.networkError,
                err.graphQLErrors
            )
        }
    });

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
                    duration: 3000,
                    useNativeDriver: false
                }).start();
    
                setTimeout(() => {
                    // Fade out
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true
                    }).start(() => setShowEventPopup(false));
                }, 3000);
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

    const createMomentum = () => {
        console.log({ channelId: chanelInfo.id, message: momentMessage })
        createMoment({ variables: { 
            channelId: chanelInfo.id, 
            message: momentMessage 
        } });
        setModalVisible(false);
        setMomentMessage("");
    }
    const MessageRenderer = ({ item }) => {
        if (item.messageType === 'basic') {
            return (
                <View
                style={styles.messageContainer}>
                    <Text style={styles.messageContent}>{item.content}</Text>
                </View>
            );
        }
    
        if (item.messageType === 'photo') {
            return (
                <View

                style={styles.messageContainer}>
                    <Image source={{ uri: item.messageImage }} style={styles.messageImage} />
                    <Text style={styles.messageContent}>{item.content}</Text>
                </View>
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

        if (item.messageType === "moment") {
            return(
            <TouchableOpacity onPress={() => navigation.navigate('CameraComponent', {messageId: item.id})} style={styles.momentMessageContainer}>
                <Ionicons name='images' size={28} color='gray'/>
                <Text style={styles.momentMessageContent}>Ver Momento</Text>
            </TouchableOpacity>
            )
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
                                    ref={flatListRef}
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
                        { messageToSend === "" &&
                            <View>
                            {isCreator &&
                                <TouchableOpacity 
                                    onPress={() => setModalVisible(true)} 
                                    style={{ 
                                        padding: 10, 
                                        backgroundColor: '#a565f2', 
                                        marginLeft: 10, 
                                        borderRadius: 15,
                                        position: "relative",
                                        marginTop: -70,
                                        alignSelf: "flex-end",
                                        marginBottom: 10,
                                        marginRight: 15
                                    }}>
                                    <Ionicons name="hourglass-outline" size={30} color="#101010" />
                                </TouchableOpacity>
                            }
                            </View>
                            }
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
                        <View>
                            <TouchableOpacity onPress={pickMedia} style={{ padding: 10, backgroundColor: '#a565f2', marginLeft: 10, borderRadius: 15 }}>
                                <Ionicons name="image" size={30} color={contentUrl ? "#101010" : "#101010"} />
                            </TouchableOpacity>
                        </View>

                       }
                       <TouchableOpacity 
                           style={{ padding: 10, backgroundColor: '#a565f2', marginLeft: 10, borderRadius: 10, height: 50, justifyContent: "center" }}
                           onPress={() => {

                               console.log({
                                message: messageToSend, 
                                    messageType: contentUrl ? "photo" : "basic",
                                    messageImage: contentUrl
                               })
                              
                            const newMessage = {
                                content: messageToSend, 
                                messageType: contentUrl ? "photo" : "basic",
                                messageImage: contentUrl
                            };
                           
                            // Suponiendo que chanelInfo.messages es un array, 
                            // crea una copia y añade el nuevo mensaje
                            setChanelInfo(prevState => ({
                                ...prevState,
                                messages: [...prevState.messages, newMessage]
                            }));
                    
                            setMessageToSend("");
                            setContentUrl(""); // Reset the image
                    
                            // Desplaza el FlatList al último mensaje
                            flatListRef.current.scrollToEnd({ animated: true });
                           
                            sendNewMessage({ variables: newMessage });
                           }}
                       >
                           <Text style={{ color: 'white' }}>Enviar</Text>
                       </TouchableOpacity>
                        </View>
                    )}

                </>
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setModalVisible(!isModalVisible);
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ 
                            height: 200, 
                            width: 300, 
                            padding: 20, 
                            backgroundColor: '#252525', 
                            borderRadius: 10,
                            shadowColor: "#a565f2",
                            shadowOffset: {
                                width: 1,
                                height: 1,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 4.65, }}>
                            <TextInput
                                placeholder="Escribe tu moment..."
                                value={momentMessage}
                                onChangeText={setMomentMessage}
                                multiline
                                style={{ borderBottomWidth: 1, marginBottom: 15, backgroundColor: "#454545", fontSize: 20, height: 25, borderRadius: 10, padding: 5 }}
                            />
                       
                            <Button 
                                title="Crear Moment"
                                onPress={() => {createMomentum}}
                            />
                           
                            <Button 
                                title="Cancelar"
                                onPress={() => setModalVisible(false)}
                                color="red"
                            />
                        </View>
                    </View>
                </Modal>
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
        backgroundColor: '#252525',
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
    },
    momentMessageContainer: {
        backgroundColor: '#252525',  // Usando el color de acento para destacarlo
        padding: 10,
        borderRadius: 40,
        marginVertical: 30,
        alignSelf: "flex-end",
        width: 290,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    
    momentMessageContent: {
        color: 'white',
        fontWeight: "600",  
        fontSize: 17,
        marginHorizontal: 8,
    },
    
    // Si decides añadir un ícono, deberás agregar un estilo para él también
    momentMessageIcon: {
        color: 'white',
        fontSize: 18,  // o el tamaño que desees para el ícono
    },
});


