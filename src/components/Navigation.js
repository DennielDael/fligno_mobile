import React from "react";
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SplasScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const{userInfo, splashLoading} = useContext(AuthContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {splashLoading ? (
                    <Stack.Screen 
                        name="Splash Screen" 
                        component={SplasScreen} 
                        options={{headerShown: false}} 
                    />
                ) : userInfo.access_token ? (
                    <Stack.Screen name="Home" component={HomeScreen} />
                ) : (
                    <>
                        <Stack.Screen 
                            name="Login" 
                            component={LoginScreen} 
                            options={{headerShown: false}} 
                        />
                        <Stack.Screen 
                            name="Register" 
                            component={RegisterScreen} 
                            options={{headerShown: false}}
                        />
                    </> 
                    )
                }
            </Stack.Navigator>
       </NavigationContainer>
    );
};

export default Navigation