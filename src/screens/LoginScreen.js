import React, { useState, useContext } from "react";
import {
     View, 
     Text, 
     TextInput, 
     TouchableOpacity,
     Button,
     StyleSheet
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";



const LoginScreen = ({navigation}) => {  
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const {isLoading, login} = useContext(AuthContext);

    return (
        <View style={style.container}>
            <View style={{width: 250,}}>
               <Spinner visible={isLoading} />
                <TextInput 
                    style={style.input}
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={text => setEmail(text)} 
                />
                <TextInput 
                    style={style.input}
                    placeholder="Enter password"
                    value={password}
                    onChangeText={text => setPassword(text)} 
                    secureTextEntry
                />
                <Button 
                    title="Login"
                    onPress={() => {
                        login(email,password);
                    }} 
                />
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text> Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={style.link}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    link: {
        color: 'blue',
    }
})


export default LoginScreen




