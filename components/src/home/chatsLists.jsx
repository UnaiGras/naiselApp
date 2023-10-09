import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { useQuery } from "@apollo/client";
import { CHAT_LIST } from "./homeQuerys";
import { Ionicons } from "@expo/vector-icons";

export const ChatsList = ({navigation}) => {
    const [chatList, setChatList] = useState();
    const fadeInAnimation = useRef(new Animated.Value(0)).current;

    const {data} = useQuery(CHAT_LIST, {
        onError: err => console.log(err, "ChatList"),
        onCompleted: info => setChatList(info.requestChats.chats.slice().reverse())
    });

    useEffect(() => {
        Animated.timing(fadeInAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.View style={{flex: 1, opacity: fadeInAnimation}}>
            { data ? (
                <FlatList
                    data={chatList}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <ChatCard item={item} navigation={navigation}/>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View style={{alignItems: "center"}}>
                        <Ionicons name="albums" size={200} color="gray"/>
                        <Text style={styles.noChatsText}>Parece que no tienes ningun chat!!</Text>
                        <Text style={styles.noChatsText}>Explora con quien puedes hablar.</Text>
                    </View>
                </View>
            )}
        </Animated.View>
    )
}

const ChatCard = ({item, navigation}) => {
    return(
        <TouchableOpacity
        style={{paddingVertical: 10, marginVertical: 10}}
        onPress={()=> {
            navigation.navigate("ChannelScreen", {
                planId: item.plan.id,
                creatorId: item.plan.author.id
            })
        }}
        >
            <View style={styles.chatCard}>
                <Image 
                    style={styles.planPhoto}
                    source={{uri: item.plan.photo}}
                />
                    <View style={styles.profileBox}>

                        <Image 
                            style={styles.photo}
                            source={{uri: item.plan.author.profilePhoto}}
                            />
                        
                            <Text style={{fontSize: 20, fontWeight: "600", marginLeft: 20, color: "white"}}>{item.plan.planName}</Text>
                        <Text style={{fontSize: 16, fontWeight: "600", marginLeft: 20, color: "gray"}}>{item.plan.author.username}</Text>
                    </View>
                    <View style={{marginBottom: 15, marginTop: 5, marginHorizontal: 20,alignSelf: "flex-start"}}>
                        <Text style={{color: "gray", fontSize: 14, fontWeight: "500"}}>
                            {item.plan.description}
                        </Text>
                    </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chatCard: {
        borderRadius: 20,
        backgroundColor: "#151515",
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        shadowColor: "#a565f2",
        shadowColor: "gray",
        shadowOffset: {
          width: 4,
          height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 8,
    },
    profileBox: {
        borderRadius: 8,
        backgroundColor: "#151515",
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        alignSelf: "center"
    },
    photo: {
        borderRadius: 100,
        height: 40,
        width: 40
    },
    noChatsText: {
        color: "gray",
        fontSize: 16,
        fontWeight: "700"
    },
    planPhoto: {
        width: "100%",
        height:  80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})