import React, { useState } from "react";
import axios from "axios";
import { createContext } from "react";
import { BASE_URL } from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";




export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const[userInfo, setUserInfo] = useState({});
    const[isLoading, setIsLoading] = useState(false);
    const[splashLoading, setSplashLoading] = useState(false);

    const register = (name, email, password) => {
        setIsLoading(true);

        axios.post(`${BASE_URL}/register`,{
             name,
             email, 
             password,
        })
        .then(res => { 
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false)
            console.log(userInfo);
        })
        .catch(e => {
            console.log(`register error ${e}`);
            setIsLoading(false);
        });
    };

    const login = (email, password) => {
        setIsLoading(true);

        axios.post(`${BASE_URL}/login`,{
            email,
            password,
        })
        .then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
        })
        .catch(e => {
            console.log(`login error ${e}`);
            setIsLoading(false);
        });
    };

    const logout = () => {
        setIsLoading(true);

        axios.post(`${BASE_URL}/logout`,{},
            {
                headers: {Authorization: `bearer ${userInfo.access_token}`},
            },
        )
        .then(res => {
            console.log(res.data);
            AsyncStorage.removeItem(`userInfo`);
            setUserInfo({});
            setIsLoading(false);
        })
        .catch(e => {
            console.log(`logout error ${e}`);
            setIsLoading(false);
        });
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }
            setSplashLoading(false);
        }catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`)
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider 
            value = 
                {{
                    isLoading,
                    userInfo,
                    splashLoading,
                    register,
                    login,
                    logout, 
                }}
        >
            {children}
        </AuthContext.Provider>

    );
};


