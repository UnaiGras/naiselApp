import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, Animated, Easing, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from './gestionQuerys';

export default function UserMetrics() {
    const { data, loading, error } = useQuery(GET_USER_INFO);

    const fadeAnim = new Animated.Value(0);
    const translateYAnim = new Animated.Value(50);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
    if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.moneyText}>{data.getUserInfo.money}€</Text>
            </View>

            <View style={styles.plansSection}>
                <Text style={styles.sectionTitle}>Plans</Text>
                <FlatList
                    data={data.getUserInfo.plansInfo}
                    renderItem={({ item }) => (
                        <Animated.View style={[styles.planCard, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}>
                            <Image source={{ uri: item.image }} style={styles.planCardImage} />
                            <Text style={styles.planCardTitle}>{item.plan.planName}</Text>
                            <Text style={styles.planSubText}>Purchased by: {item.purchasedByCount}</Text>
                        </Animated.View>
                    )}
                    keyExtractor={item => item.plan.planName}
                />
            </View>

            <View style={styles.channelCard}>
                <Text style={styles.channelName}>{data.getUserInfo.channelInfo.channelName}</Text>
                <Text style={styles.channelMembers}>Members: {data.getUserInfo.channelInfo.channelMembers}</Text>
            </View>
        </View>
    );
}

// (Los estilos que proporcioné anteriormente irían aquí, con los siguientes añadidos)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1E',  // Un gris oscuro base
        alignItems: 'center',
    },
    moneyText: {
        color: '#FFF',
        fontSize: 38,
        fontWeight: '600',
        marginTop: 40,
        marginBottom: 20,
    },
    planCard: {
        width: '95%',
        padding: 10,
        backgroundColor: '#2C2C2E',  // Un gris más claro que el fondo
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    planCardImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    planCardTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5,
    },
    memberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    memberText: {
        color: '#A9A9A9',  // Gris medio
        fontSize: 16,
        fontWeight: '500',
    },
    header: {
        width: '80%',
        alignItems: 'center',
        borderBottomColor: '#3A3A3C',  // Ligeramente más claro que el fondo
        borderBottomWidth: 0.5,
        paddingBottom: 15,
        backgroundColor: "#2C2C2E",
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 20
    },
    plansSection: {
        flex: 2,
        width: "100%",
    },
    sectionTitle: {
        color: '#A9A9A9',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 15,
        paddingLeft: 20,
    },
    planDetail: {
        flex: 1,
    },
    planSubText: {
        color: '#777',
        fontSize: 16,
    },
    channelCard: {
        width: '95%',
        padding: 15,
        backgroundColor: '#2C2C2E',
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 10,
        alignItems: 'center',
    },
    channelName: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    channelMembers: {
        color: '#A9A9A9',
        fontSize: 18,
    },
});

