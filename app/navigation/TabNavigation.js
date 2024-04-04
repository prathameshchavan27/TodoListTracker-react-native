import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import {FontAwesome, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons'
import {ModalPortal} from 'react-native-modals'
import Home from '../screens/Home';
import Calender from '../screens/Calender';
import Profile from '../screens/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TaskInfo from '../screens/TaskInfo'

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='home' component={Home}/>
      <Stack.Screen name='taskInfo' component={TaskInfo}/>
    </Stack.Navigator>
  )
}
export default function TabNavigation() {
  return (
    <BottomTabs.Navigator>
        <BottomTabs.Screen
        name="hometab"
        component={HomeTab}
        options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: { color: "#7CB9E8" },
            headerStatusBarHeight:10,
            headerTitle: '',
            // headerShown: false,
            tabBarIcon:({focused})=>
            focused? (
            <FontAwesome name="tasks" size={24} color={'#7CB9E8'}/>
            ):(
            <FontAwesome name="tasks" size={24} color={'black'}/>
            )
        }}
        />
        <BottomTabs.Screen
        name="calender"
        component={Calender}
        options={{
            tabBarLabel: "Calendar",
            tabBarLabelStyle: { color: "#7CB9E8" },
            headerStatusBarHeight:10,
            headerTitle: '',
            // headerShown: false,
            tabBarIcon:({focused})=>
            focused? (
            <AntDesign name="calendar" size={24} color={'#7CB9E8'}/>
            ):(
            <AntDesign name="calendar" size={24} color={'black'}/>
            )
        }}
        />
        <BottomTabs.Screen
        name="profile"
        component={Profile}
        options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#7CB9E8" },
            headerStatusBarHeight:10,
            headerTitle: '',
            tabBarIcon:({focused})=>
            focused? (
            <MaterialCommunityIcons name="account-details" size={24} color={'#7CB9E8'}/>
            ):(
            <MaterialCommunityIcons name="account-details" size={24} color={'black'}/>
            )
        }}
        />
    </BottomTabs.Navigator>
  )
}

const styles = StyleSheet.create({})