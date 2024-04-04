import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons'
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const navigation = useNavigation();
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos/count");
      const { totalCompletedTasks, totalPendingTasks } = response.data;
      setCompletedTasks(totalCompletedTasks);
      setPendingTasks(totalPendingTasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  console.log("Completed", completedTasks);
  console.log("Pending", pendingTasks);
  const logout = () =>{
    AsyncStorage.removeItem("authToken");
    navigation.navigate('login');
  }
  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{
            uri: "https://lh3.googleusercontent.com/ogw/ANLem4Zmk7fohWyH7kB6YArqFy0WMfXnFtuX3PX3LSBf=s64-c-mo",
          }}
        />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Keep plans for 15 days
          </Text>
          <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
            Select Categories
          </Text>
        </View>
        <MaterialIcons onPress={logout} style={{marginLeft: 'auto'}} name="logout" size={24} color="black" />
      </View>
      <View style={{ marginVertical: 12 }}>
        <Text>Tasks Overview</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#89CFF0",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              {completedTasks}
            </Text>
            <Text style={{ marginTop: 4 }}>Completed Tasks</Text>
          </View>
          <View
            style={{
              backgroundColor: "#89CFF0",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              {pendingTasks}
            </Text>
            <Text style={{ marginTop: 4 }}>Pending Tasks</Text>
          </View>
        </View>
      </View>
      <LineChart
        data={{
          labels: ["CompletedTasks", "PendingTasks"],
          datasets: [
            {
              data: [completedTasks, pendingTasks],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View
        style={{
          backgroundColor: "#89Cff0",
          padding: 10,
          borderRadius: 6,
          marginTop: 15,
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>
          Tasks for the next seven days
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Image
          style={{ width: 120, height: 120 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/9537/9537221.png",
          }}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
