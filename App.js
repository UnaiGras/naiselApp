import "react-native-gesture-handler"
import React, { useState, useEffect, createContext } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import Navigation from './navigation';
import { createUploadLink } from 'apollo-upload-client';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { StripeProvider } from '@stripe/stripe-react-native';
import MainScreen from "./components/src/home/Main";


export const AuthContext = createContext()

const App = () => {

  const [token, setUserToken] = useState('')
  const [client, setClient] = useState(
    new ApolloClient({
    link: createUploadLink({
      uri: 'http://192.168.0.15:4000/graphql',
      headers: {
        'authorization': `bearer `
      }
    }),
    cache: new InMemoryCache(),
  }))

  const toastConfig = {

    success: (props) => (
      <BaseToast
      {...props}
        style={{ borderLeftColor: 'green', height: 100 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: '700',

        }}
        text2Style={{
          fontSize: 13,
          fontStyle: 'italic',
          fontWeight: '400'
        }}
      />
    ),
  
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red', height: 100 }}
        text1Style={{
          fontSize: 16,
          fontWeight: '700',

        }}
        text2Style={{
          fontSize: 13,
          fontStyle: 'italic',
          fontWeight: '400'
        }}
      />
    ),
  };


  useEffect(() => {
    console.log("si esto sale es que funciona miperro", token)
    setClient(
      new ApolloClient({
      link: createUploadLink({
        uri: 'http://192.168.0.15:4000/graphql',
        headers: {
          'authorization': `bearer ${token}`
        }
      }),
      cache: new InMemoryCache(),
    }))
  },[token])

   


  return (
    <AuthContext.Provider value={[token, setUserToken]}>
    <ApolloProvider client={client}>
      <StripeProvider
        publishableKey="pk_test_51MXBeYIzb8Qf9yX4EKcfEtT0PWx9YLaxZLYq4q4vMa5Xy8KZtRh16wC3z66eVGYWeFut0A07T3T6sNdhVmlHGP4100g0Bs1LtG"
      >
          <Navigation>
              <MainScreen/>
          </Navigation>
        <Toast config={toastConfig}/>
      </StripeProvider>
    </ApolloProvider>
    </AuthContext.Provider>
  );
};

export default App;

