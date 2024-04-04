import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Ionicons,
  Entypo,
  Feather,
  MaterialIcons,
  FontAwesome
} from "@expo/vector-icons";
import {
  BottomModal,
  SlideAnimation,
  ModalContent,
  ModalTitle,
  ModalPortal,
} from "react-native-modals";
import axios from "axios";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const today = moment().format("MMM Do");
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const navigation = useNavigation();
  // const todos = [];
  const [todayDate, setTodayDate] = useState();
  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go Excercising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    {
      id: "4",
      todo: "Go Shopping",
    },
    {
      id: "5",
      todo: "finish assignments",
    },
  ];
  
  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };
      axios
        .post("http://localhost:3000/todos/660bb6c81c0c403442b6a186", todoData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error", error);
        });
        await getUserTodos();
      setIsModalVisible(false);
      setTodo("");
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUserTodos();
  }, [marked, isModalVisible]);
  
  const getUserTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/users/660bb6c81c0c403442b6a186/todos"
      );
      console.log(response.data.todos);
      console.log("Date",response.data.date)
      setTodayDate(response.data.date);
      setTodos(response.data.todos);
      const fetchedTodos = response.data.todos || [];
      const pending = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );
      const completed = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );
      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.log(error);
    }
  };
  
  const markTodoAsCompleted = async (todoId) => {
    try {
      setMarked(true);
      const response = await axios.patch(
        `http://localhost:3000/todos/${todoId}/complete`
      );
      console.log(response.data);
      await getUserTodos();
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("c", completedTodos);
  console.log("p", pendingTodos);
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          onPress={()=>setCategory('All')}
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable
          onPress={()=>setCategory('Work')}
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable
          onPress={()=>setCategory("Personal")}
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Personal</Text>
        </Pressable>
        <Pressable onPress={() => setIsModalVisible(!isModalVisible)}>
          <AntDesign name="pluscircle" size={30} color={"#007FFF"} />
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {todos.filter((todo)=>todo.category===category && todo.createdAt>=(todayDate+'T00:00:00.000Z') && todo.createdAt<(todayDate+'T23:59:59.999Z'))?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text>Tasks to Do! {today}</Text>}
              {pendingTodos?.filter((todo)=>todo.category===category && todo.createdAt>=(todayDate+'T00:00:00.000Z') && todo.createdAt<(todayDate+'T23:59:59.999Z')).map((item, index) => (
                <Pressable
                onPress={()=>{
                  navigation.navigate("taskInfo",{
                    id:item._id,
                    title: item?.title,
                    category: item?.category,
                    createdAt: item?.createdAt,
                    dueDate: item?.dueDate
                  })
                }}
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Entypo onPress={()=>markTodoAsCompleted(item?._id)} name="circle" size={18} color={"black"} />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <Feather name="flag" size={20} color={"black"} />
                  </View>
                </Pressable>
              ))}
              {completedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Completed Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color={"black"}
                    />
                  </View>
                  {completedTodos?.filter((todo)=>todo.category===category && todo.category!=='All' && todo.createdAt>=(todayDate+'T00:00:00.000Z') && todo.createdAt<(todayDate+'T23:59:59.999Z')).map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <FontAwesome name="circle" size={18} color={"black"} />
                        <Text style={{ flex: 1, textDecorationLine: 'line-through',color: 'gray' }}>{item?.title}</Text>
                        <Feather name="flag" size={20} color={"gray"} />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No Task for today! add a task
              </Text>
              <Pressable
                onPress={() => setIsModalVisible(!isModalVisible)}
                style={{ marginTop: 15 }}
              >
                <AntDesign name="pluscircle" size={30} color={"#007FFF"} />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setIsModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setIsModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setIsModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new task here"
              style={{
                padding: 10,
                borderColor: "#E0E0E0",
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <Ionicons
              onPress={addTodo}
              name="send"
              size={24}
              color={"#007FFF"}
            />
          </View>
          <Text>Choose Category</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setCategory("Work")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                // backgroundColor: category==='Work'?'#7CB9E8':'#FFFFFF',
                borderRadius: 25,
              }}
            >
              <Text>Work</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Personal")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
                // backgroundColor: category==='Personal'?'#7CB9E8':'#FFF'
              }}
            >
              <Text>Personal</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("WishList")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
                // backgroundColor: bg
              }}
            >
              <Text>WishList</Text>
            </Pressable>
          </View>
          <Text>Some suggestions</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {suggestions?.map((item, index) => (
              <Pressable
                onPress={() => setTodo(item?.todo)}
                style={{
                  backgroundColor: "#F0F8FF",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 25,
                }}
              >
                <Text style={{ textAlign: "center" }}>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
      <ModalPortal />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
