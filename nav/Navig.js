import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Book from '../screens/Book';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Book"
        component={Book}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function Navig() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={Settings}
        options={{
          tabBarIcon: ({color}) => <Icon name="map" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
