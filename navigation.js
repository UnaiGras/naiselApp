import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import Login1 from "./components/src/login/Login1";
import Register from "./components/src/login/Register";
import NewPlan from "./components/src/create/NewPlan";
import MainScreen from "./components/src/home/Main";
import { ProfileScreen } from "./components/src/profile/Profile";
import { SearchScreen } from "./components/src/searcher/SearchScreen";
import { MakerProfileScreen } from "./components/src/makerProfile/makerProfile";
import PlanScreen from "./components/src/plans/planScreen";
import { NotProfileScreen } from "./components/src/externalProfile/notMyProfile";
import EditProfile from "./components/src/profile/editProfile";
import { VoiceTrainingScreen } from "./components/src/voiceTrining/voiceTrain";
import { ChatScreen } from "./components/src/chat/ChatBox";
import { Plans } from "./components/src/profile/GestionPlans";
import { CreatePlanForm } from "./components/src/plans/newPlanForm";


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
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                />
                <Stack.Screen
                    name="MakerProfile"
                    component={MakerProfileScreen}
                />
                <Stack.Screen
                    name="PlanScreen"
                    component={PlanScreen}
                />
                <Stack.Screen
                    name="NotProfileScreen"
                    component={NotProfileScreen}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                />
                <Stack.Screen
                    name="VoiceTrainingScreen"
                    component={VoiceTrainingScreen}
                />
                <Stack.Screen
                    name="ChatScreen"
                    component={ChatScreen}
                />
                <Stack.Screen
                    name="Plans"
                    component={Plans}
                />
                <Stack.Screen
                    name="CreatePlanForm"
                    component={CreatePlanForm}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}