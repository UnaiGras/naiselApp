import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL_CODE } from './loginQueries';

export const EmailVerificationScreen = ({ route, navigation }) => {
    const { username } = route.params;
    const [code, setCode] = useState('');

    const [verifyEmailCode, { loading }] = useMutation(VERIFY_EMAIL_CODE, {
        onCompleted: (data) => {
            if (data.verifyEmailCode.success) {
                Alert.alert("¡Éxito!", data.verifyEmailCode.message);
                navigation.navigate('MainScreen');
            } else {
                Alert.alert("Error", data.verifyEmailCode.message);
            }
        },
        onError: (err) => {
            Alert.alert("Error", "Hubo un problema al verificar el código.");
        }
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Verificación de correo</Text>
            <Text>Por favor, introduce el código de 6 dígitos que enviamos a tu correo electrónico:</Text>
            <Input 
                placeholder='Código'
                value={code}
                onChangeText={setCode}
                keyboardType='number-pad'
                maxLength={6}
            />
            <Button 
                title='Verificar'
                loading={loading}
                onPress={() => {
                    verifyEmailCode({ variables: { username, code } });
                }}
            />
        </View>
    );
};


