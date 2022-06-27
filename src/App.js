import React, {useState, useEffect} from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
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
import Nutrients from './Nutrients.js';
import { First, Second, Third } from './Workout.js';
import { useAsyncStorage, storeData, getData } from './BetterAsync.js';

import ogfoods from './assets/foods.json';

import Context from './Context.js';

export default function App() {

  const Tab = createBottomTabNavigator();

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
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerRight: () => (
              <TouchableHighlight
                style={{marginRight: 8}}
                onPress={() => {navigation.navigate("Nutrients");}}
                activeOpacity={0.6}
                underlayColor="white">
                  <MaterialCommunityIcons name={"chart-pie"} size={30} color={"grey"}/>
              </TouchableHighlight>
          ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Searcher}
          options={{
            headerShown: true,
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Workout"
          component={First}
          options={{
            headerShown: true,
            tabBarLabel: 'Workout',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={Archive}
          options={{
            headerShown: false,
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

  const [foods, setFoods] = useAsyncStorage('@foods', ogfoods);
  const [today, setToday] = useAsyncStorage('@today', []);
  const [archive, setArchive] = useAsyncStorage('@slots', []);

  return (
    <Context.Provider value={{today: today, slots: archive, setToday: setToday, setArchive: setArchive, foods: foods, setFoods: setFoods}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="All" component={MyTabs} options={{headerShown: false,}}/>
          <Stack.Screen name="Details" component={DetailsPanel}/>
          <Stack.Screen name="Edit" component={EditPanel} />
          <Stack.Screen name="Nutrients" component={Nutrients} />
          <Stack.Screen name="Excercises" component={Second} />
          <Stack.Screen name="Sets" component={Third} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
