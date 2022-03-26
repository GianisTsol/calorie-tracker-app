import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Searcher from './Search.js';
import DetailsPanel from './Details.js';
import EditPanel from './Editor.js';
import Front from './Front.js';
import Archive from './Archive.js';
import Settings from './Settings.js';
import { useAsyncStorage, storeData, getData } from './BetterAsync.js';

export default function App() {
  const Tab = createBottomTabNavigator();

  const [today, setToday] = useAsyncStorage('@today', []);
  const [archive, setArchive] = useAsyncStorage('@slots', []);

  function toArchive() {
    let kk = new Date().toLocaleString();

    setArchive([...archive, `@archive-${kk}`]);
    storeData(`@archive-${kk}`, [...today]);
    setToday([]);
    console.log("Set today to []")
  }

  function MyTabs({ navigation }) {
    return (
      <Tab.Navigator
        initialRouteName="Search"
        screenOptions={{
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Today"
          component={Front}
          initialParams={{today: today, archive: toArchive}}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Searcher}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={Archive}
          options={{
            tabBarLabel: 'Archive',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="archive" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="All" component={MyTabs} options={{headerShown: false,}}/>
        <Stack.Screen name="Details" component={DetailsPanel} initialParams={{setToday: setToday, today: today}}/>
        <Stack.Screen name="Edit" component={EditPanel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
