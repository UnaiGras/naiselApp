import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import Login1 from "./components/src/login/Login1";
import Register from "./components/src/login/Register";
import NewPlan from "./components/src/create/NewPlan";
import MainScreen from "./components/src/home/Main";

const Stack = createStackNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='MainScreen'
                screenOptions={{
                  gestureEnabled: true,
                  ...TransitionPresets.SlideFromRightIOS
                    }}>
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                />
                <Stack.Screen
                    name="Login1"
                    component={Login1}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                />
                <Stack.Screen
                    name="NewPlan"
                    component={NewPlan}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}