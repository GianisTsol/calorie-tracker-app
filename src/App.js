import * as React from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key/data', jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key/data')
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log(e);
  }
}


export default function App() {
  const Tab = createBottomTabNavigator();

  const [today, setToday] = React.useState([]);

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
          initialParams={{today: today}}
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
  React.useEffect(() => {
    getData().then((data) => {if (today.length < data.length){setToday(data);} else if (today.length > data.length){storeData(today)}})
  }, [])
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
