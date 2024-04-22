// MainNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AttendanceScreen from './../Screens/Attendence';
import OtherCostScreen from './../Screens/OtherCost';
import ProfileScreen from '../Screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AttendanceStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        {/* Add more screens for Attendance feature if needed */}
    </Stack.Navigator>
);

const OtherCostStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="OtherCost" component={OtherCostScreen} />
        {/* Add more screens for Other Cost feature if needed */}
    </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* Add more screens for Profile feature if needed */}
    </Stack.Navigator>
);

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Attendance" component={AttendanceStack} />
                <Tab.Screen name="Other Cost" component={OtherCostStack} />
                <Tab.Screen name="Profile" component={ProfileStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;
