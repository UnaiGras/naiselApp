import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from './gestionQuerys';

export default function UserMetrics() {
    const { data, loading, error } = useQuery(GET_USER_INFO);

    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
    if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.moneyText}>Money: ${data.getUserInfo.money}</Text>
            </View>

            <View style={styles.plansSection}>
                <Text style={styles.sectionTitle}>Plans</Text>
                <FlatList
                data={data.getUserInfo.plansInfo}
                renderItem={({ item }) => (
                    <View style={styles.planCard}>
                        <Image source={{ uri: item.image }} style={styles.planCardImage} />
                        <Text style={styles.planCardTitle}>{item.plan.planName}</Text>
                        <Text style={styles.planSubText}>Purchased by: {item.purchasedByCount}</Text>
                    </View>
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
        backgroundColor: '#1B1B1B',  // Oscuro
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    moneyText: {
        color: '#FFF',  // Texto blanco
        fontSize: 36,   // Hacerlo más grande
        marginBottom: 20,
        textShadowColor: '#A9A9A9',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        elevation: 5,
    },
    planCard: {
        width: '90%',
        padding: 5,
        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        alignSelf: "center",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 15
    },
    planCardImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
    },
    planCardTitle: {
        color: '#FFF',
        fontSize: 20,
        marginBottom: 10,
    },
    memberContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#2E2E2E',  // Un gris ligeramente más claro
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    memberText: {
        color: '#FFF',
        fontSize: 16,
    },
    loadingText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#A9A9A9',
    },

    errorText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#FF0000',
    },

    header: {
        marginBottom: 20,
        alignSelf: 'center',
    },

    plansSection: {
        flex: 2,
        width: "100%",
        marginBottom: 15
    },

    channelSection: {
        flex: 1,
    },

    sectionTitle: {
        color: '#A9A9A9',
        fontSize: 22,
        marginBottom: 10,
        alignSelf: 'center',
        borderBottomColor: '#A9A9A9',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },

    planDetail: {
        flex: 1,
    },

    planSubText: {
        color: '#A9A9A9',
        fontSize: 16,
    },
    channelCard: {
        width: '90%',
        padding: 20,
        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        alignItems: 'center',
    },

    channelName: {
        color: '#FFF',
        fontSize: 20,
        marginBottom: 10,
    },

    channelMembers: {
        color: '#A9A9A9',
        fontSize: 16,
    },
});
