import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import {useQuery} from "@apollo/client"
import { CHAT_LIST } from "./homeQuerys";
import { Ionicons } from "@expo/vector-icons";

export const ChatsList = ({navigation}) => {

    const {data} = useQuery(CHAT_LIST, {
        onError: err => {
            console.log(err, "ChatList")
        },
        onCompleted: info => {
            console.log(info)
        }
    })

    return(
        <View style={{flex:1}}>
            { data &&
                <FlatList
                    data={data.requestChats.chats}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <ChatCard item={item} navigation={navigation}/>
                        </TouchableOpacity>
                    )}
                />
            }
            {!data &&
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View style={{alignItems: "center"}}>
                        <Ionicons name="albums" size={200} color="gray"/>
                        <Text style={styles.noChatsText}>Parece que no tienes ningun chat!!</Text>
                        <Text style={styles.noChatsText}>Explora con quien puedes hablar.</Text>
                    </View>
                    
                </View>
            }
        </View>
    )
}

const ChatCard = ({item, navigation}) => {
    return(
        <TouchableOpacity
        style={{paddingVertical: 10, marginVertical: 10}}
        onPress={()=> {
            navigation.navigate("ChatScreen", {
                planId: item.plan.id
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
                        
                            <Text style={{fontSize: 20, fontWeight: "600", marginLeft: 20}}>{item.plan.planName}</Text>
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
        elevation: 6
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