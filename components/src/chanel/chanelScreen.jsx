import React, {useState} from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    Image, 
    TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GET_CHANEL } from './channelQuerys';
import { useQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import ME from "./channelQuerys"
import { SEND_NEW_MESSAGE } from './channelQuerys';

export const ChannelScreen = ({navigation, route }) => {

    const {planId} = route.params
    const {creatorId} = route.params
    const [chanelInfo, setChanelInfo] = useState(null)
    const [messageToSend, setMessageToSend] = useState("");
    const isCreator = mydata?.me.id === creatorId;

    const { loading, error, data } = useQuery(GET_CHANEL, {
        variables: {
            creatorId: creatorId
        },
        onError: err => {
            console.log(err)
        }
    });

    const {data: mydata} = useQuery(ME)

    const [sendNewMessage, {data: messageResponse}] = useMutation(SEND_NEW_MESSAGE)

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
                    <Text style={styles.messageSender}>{item.sender.name}</Text>
                    <Text style={styles.messageContent}>{item.content}</Text>
                </View>
            );
        }
    
        if (item.messageType === 'photo') {
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.messageSender}>{item.sender.name}</Text>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 10 }}>
                       <TextInput
                           style={{ flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10 }}
                           value={messageToSend}
                           onChangeText={setMessageToSend}
                           placeholder="Escribe tu mensaje..."
                       />
                       <TouchableOpacity onPress={pickImage}>
                           <Ionicons name="image" size={30} color={selectedImage ? "blue" : "gray"} />
                       </TouchableOpacity>
                       <TouchableOpacity 
                           style={{ padding: 10, backgroundColor: '#3498db', marginLeft: 10, borderRadius: 5 }}
                           onPress={() => {
                               // Implementa la mutación aquí
                               const messageType = selectedImage ? "photo" : "basic";
                              
                               sendNewMessage({ 
                                   variables: { 
                                    chatId: chanelInfo.id,
                                    content: messageToSend, 
                                    messageType: messageType, 
                                    messageImage: selectedImage 
                                   } 
                               })
                               setMessageToSend("");
                               setSelectedImage(null); // Reset the image
                           }}
                       >
                           <Text style={{ color: 'white' }}>Enviar</Text>
                       </TouchableOpacity>
                        </View>
                    )}

                </>
                }
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


