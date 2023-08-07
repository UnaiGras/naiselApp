import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GET_COMMON_PLANS } from './channelQuerys';
import { useQuery } from '@apollo/client';


export const ChannelDetailScreen = ({route, navigation}) => {
    const { channel } = route.params
    const { creatorId } = route.params

    const { loading, error, data } = useQuery(GET_COMMON_PLANS, {
        variables: { creatorId: creatorId },
    });

    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data])

    return (
        <View style={styles.container}>
            <Image source={{ uri: channel.photo }} style={styles.channelPhoto} />
            <Text style={styles.channelName}>{channel.name}</Text>
            <Text style={styles.memberCount}>{channel.members ? `${channel.members.length} miembros` : "0 miembros"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#101010"
    },
    channelPhoto: {
        width: "100%",
        height: 210,
    },
    channelName: {
        fontSize: 24,
        color: 'white',
    },
    memberCount: {
        fontSize: 16,
        color: 'white',
    }
});
