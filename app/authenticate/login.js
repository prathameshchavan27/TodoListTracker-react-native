import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(()=>{
    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if(token){
                navigation.navigate('tabs')
            }
        } catch (error) {
            console.log(error);
        }
    }
    checkLoginStatus();
  },[])
  const handleLogin = () => {
    const user = {
        email: email,
        password: password
    };
    axios.post("http://localhost:3000/login",user).then((response)=>{
        const token = response.data.token;
        AsyncStorage.setItem("authToken",token);
        navigation.navigate('tabs')
    });
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#0066b2" }}>
          TODO-LIST TRACKER
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            Log in to your account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="enter your email"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="gray"
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              placeholder="enter your password"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forget Password
            </Text>
          </View>
          <View style={{ marginTop: 60 }}>
            <Pressable
                onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: "#6699CC",
                padding: 15,
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Login
              </Text>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate('register')} style={{ marginTop: 15 }}>
              <Text
                style={{ textAlign: "center", fontSize: 15, color: "gray" }}
              >
                Don't have an account? Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
