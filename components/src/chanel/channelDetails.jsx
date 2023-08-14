import React, { useEffect, useState } from 'react';
import { View, ScrollView,Text, ImageBackground, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { GET_COMMON_PLANS } from './channelQuerys';
import { useQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';

export const ChannelDetailScreen = ({route, navigation}) => {
    const { channel } = route.params
    const { creatorId } = route.params

    const [expandedPlanId, setExpandedPlanId] = useState(null);

    const { loading, error, data } = useQuery(GET_COMMON_PLANS, {
        variables: { creatorId: creatorId },
    });

    const toggleContentVisibility = (planId) => {
        if (expandedPlanId === planId) {
            setExpandedPlanId(null);
        } else {
            setExpandedPlanId(planId);
        }
    };

    const renderPlan = ({ item: plan }) => (
        <View style={styles.planCard}>
            <Image source={{ uri: plan.photo }} style={styles.planImage} />
            <View style={styles.planContent}>
                <Text style={styles.planTitle}>{plan.planName}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
                {plan.planContent.map((detail, index) => (
                    <Text key={index} style={styles.planDetailItem}>{detail}</Text>
                ))}
            </View>
        </View>
    );

    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data])

    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
            <ImageBackground source={{ uri: channel.photo }} style={styles.channelPhoto}>
                <Text style={styles.channelName}>{channel.name}</Text>
                <Text style={styles.memberCount}>{channel.members ? `${channel.members.length} miembros` : "0 miembros"}</Text>
            </ImageBackground>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="notifications-outline" size={30} color="#a656f2" />
                    <Text style={styles.iconText}>silenciar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="person-outline" size={30} color="#a656f2" />
                    <Text style={styles.iconText}>perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="menu-outline" size={30} color="#a656f2" />
                    <Text style={styles.iconText}>mas</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{channel.description}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text>Planes en posesión</Text>
            </View>
            {data && (
                <FlatList
                    data={data.requestContent}
                    renderItem={renderPlan}
                    keyExtractor={(plan) => plan.id}
                />
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101010"
    },
    channelPhoto: {
        width: "100%",
        height: 300,
        justifyContent: 'flex-end', // Esto alinea el contenido al final del ImageBackground    // Padding para el espacio del lado izquierdo del texto
        paddingBottom: 10,        // Padding para el espacio en la parte inferior del texto
    },
    channelName: {
        fontSize: 24,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Esto agrega una sombra detrás del texto para que sea más legible
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: "bold"
    },
    memberCount: {
        fontSize: 16,
        color: 'white',
    },
    iconContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '90%',
        marginTop: 40,
        marginVertical: 20
    },
    iconButton: {
        width: 100,
        height: 80,
        borderRadius: 10, 
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
        color: "#a656f2"
    },
    descriptionContainer: {
        width: '90%',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        alignItems: 'center'
    },
    descriptionTitle: {
        fontSize: 12,
        color: '#000',
        marginBottom: 5
    },
    descriptionText: {
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
        fontWeight: "700"
    },
    planCard: {
        width: '100%', // Ocupa toda la anchura de la pantalla
        marginTop: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden'
    },
    planImage: {
        width: '100%',
        height: 400, // Incremento del tamaño de la imagen
    },
    planContent: {
        padding: 15 // Incremento del padding
    },
    planTitle: {
        fontSize: 22, // Incremento del tamaño del texto
        color: '#000'
    },
    planDescription: {
        marginTop: 10, // Incremento del margen
        fontSize: 18, // Incremento del tamaño del texto
        color: '#000'
    },
    planDetails: {
        borderTopWidth: 1,
        borderTopColor: '#d1d1d1',
        padding: 10
    },
    planDetailItem: {
        fontSize: 16, // Incremento del tamaño del texto
        color: '#000'
    }
});

