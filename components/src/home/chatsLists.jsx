import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {useQuery} from "@apollo/client"
import { CHAT_LIST } from "./homeQuerys";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export const ChatsList = ({navigation}) => {

    const {data} = useQuery(CHAT_LIST, {
        onError: err => {
            console.log(err)
        }
    })

    return(
        <View style={{flex:1}}>
            { data &&
                <FlatList
                    data={data.requestChats.chats}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <ChatCard item={item}/>
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

const ChatCard = ({item}) => {
    return(
        <View style={styles.chatCard}>
            <Image 
                style={styles.photo}
                source={{uri: item.plan.author.profilePhoto}}
            />
            <View>
                <Text style={{fontSize: 20, fontWeight: "600"}}>{item.plan.name}</Text>
                <Text style={{fontSize: 20, fontWeight: "600"}}></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chatCard: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#151515",
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    photo: {
        borderRadius: 50,
        height: 30,
        width: 30
    },
    noChatsText: {
        color: "gray",
        fontSize: 16,
        fontWeight: "700"
    }
})