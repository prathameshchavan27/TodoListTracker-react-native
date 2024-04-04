import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./app/navigation/TabNavigation";
import login from "./app/authenticate/login";
import register from "./app/authenticate/register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="light" />
      <NavigationContainer initialRoute="login">
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={login}
            options={{
              headerTitle: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="register"
            component={register}
            options={{
              headerTitle: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="tabs"
            component={TabNavigation}
            options={{
              headerTitle: "",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
