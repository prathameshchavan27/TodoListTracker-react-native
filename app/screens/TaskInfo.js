import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, Entypo, AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
const TaskInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route.params);
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons onPress={()=>navigation.goBack()} name="arrow-back" size={30} color={"black"} />
        <Entypo name="dots-three-vertical" size={24} color={"black"} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 17, fontWeight: "500" }}>
          Category - {route.params?.category}
        </Text>
      </View>
      <Text style={{ marginTop: 25, fontSize: 20, fontWeight: "600" }}>
        {route.params.title}
      </Text>
      <View style={{ marginTop: 50 }} />
      <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <AntDesign name="plus" size={24} color={"#7CB9E8"} />
        <Text style={{ fontSize: 18, fontWeight: "500", color: "#7CB9E8" }}>
          Add a subtask
        </Text>
      </Pressable>
      <View style={{ marginTop: 25 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color={"gray"} />
            <Text style={{fontSize: 16, fontWeight: '500'}}>Due Date</Text>
          </View>
          <Pressable style={{backgroundColor: '#7CB9E8',padding: 7,borderRadius: 6}}>
            <Text style={{color:'white'}}>{route.params?.dueDate}</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Ionicons name="time-sharp" size={24} color={"gray"} />
            <Text style={{fontSize: 16, fontWeight: '500'}}>Time and Reminder</Text>
          </View>
          <Pressable style={{backgroundColor: '#7CB9E8',padding: 7,borderRadius: 6}}>
            <Text style={{color:'white'}}>No</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Feather name="repeat" size={24} color={"gray"} />
            <Text style={{fontSize: 16, fontWeight: '500'}}>Repeat task</Text>
          </View>
          <Pressable style={{backgroundColor: '#7CB9E8',padding: 7,borderRadius: 6}}>
            <Text style={{color:'white'}}>No</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <SimpleLineIcons name="note" size={24} color={"gray"} />
            <Text style={{fontSize: 16, fontWeight: '500'}}>Notes</Text>
          </View>
          <Pressable style={{backgroundColor: '#7CB9E8',padding: 7,borderRadius: 6}}>
            <Text style={{color:'white'}}>Not Added</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TaskInfo;
