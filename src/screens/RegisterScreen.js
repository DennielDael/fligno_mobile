import React, { useState } from "react";
import { useContext } from "react";
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



const RegisterScreen = ({navigation}) => {  
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
   
    const {isLoading,register} = useContext(AuthContext);
    
    return (
        <View style={style.container}>
            <Spinner visible={isLoading} />
            <View style={{width: 250,}}>
               
                <TextInput 
                    style={style.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)} 
                />
                <TextInput 
                    style={style.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)} 
                />
                <TextInput 
                    style={style.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)} 
                    secureTextEntry
                />
                <Button 
                    title="Register" 
                    onPress={() =>  {
                        register(name, email, password);
                    }}
                />
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text> have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={style.link}>Login</Text>
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


export default RegisterScreen




