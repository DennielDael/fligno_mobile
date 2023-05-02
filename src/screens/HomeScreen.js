import React from "react";
import { useContext } from "react";
import { View, Text, Button, StyleSheet} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";


const HomeScreen = () => {
    const {userInfo, logout, isloading} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Spinner visible={isloading}/>
            <Text style={styles.welcome}>Welcome {userInfo.use.name}</Text>
            <Button title="Logout" color="ree" onPress={logout}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 18,
        marginBottom: 8,
    },
});


export default HomeScreen