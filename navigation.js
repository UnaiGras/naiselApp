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
import { BecomeMakerForm } from "./components/src/profile/becomeMaker";
import { CreateChannelScreen } from "./components/src/profile/createChannelScreen";
import { ChannelScreen } from "./components/src/chanel/chanelScreen";
import { ChannelDetailScreen } from "./components/src/chanel/channelDetails";
import PlanContentForm from "./components/src/plans/addConentToPlan";

const Stack = createStackNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='MainScreen'
                screenOptions={{
                  gestureEnabled: true,
                  ...TransitionPresets.SlideFromRightIOS,
                    }}
                >
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{
                    headerStyle: {
                        backgroundColor: '#151515',
                        shadowColor: "#191919",
                    },
                    headerTitleStyle: {
                        color: "white"
                    }
                }}
                />
                <Stack.Screen
                    name="Login1"
                    component={Login1}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="NewPlan"
                    component={NewPlan}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="MakerProfile"
                    component={MakerProfileScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="PlanScreen"
                    component={PlanScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="NotProfileScreen"
                    component={NotProfileScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="VoiceTrainingScreen"
                    component={VoiceTrainingScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="ChatScreen"
                    component={ChatScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="Plans"
                    component={Plans}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="CreatePlanForm"
                    component={CreatePlanForm}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#a565f2",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="BecomeMakerForm"
                    component={BecomeMakerForm}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#191919",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="CreateChannelScreen"
                    component={CreateChannelScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#191919",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="ChannelScreen"
                    component={ChannelScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="ChannelDetailScreen"
                    component={ChannelDetailScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#191919",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="PlanContentForm"
                    component={PlanContentForm}
                    options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#191919",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}