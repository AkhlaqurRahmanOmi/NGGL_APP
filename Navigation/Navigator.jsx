import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import AttendanceScreen from "../Screens/Attendence";
import OtherCostScreen from "../Screens/OtherCost";
import ProfileScreen from "../Screens/Profile";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AttendanceStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Attendance" component={AttendanceScreen} />
  </Stack.Navigator>
);

const OtherCostStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="OtherCost" component={OtherCostScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Attendance") {
              iconName = "access-time";
            } else if (route.name === "OtherCost") {
              iconName = "attach-money";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Attendance" component={AttendanceStack} />
        <Tab.Screen name="OtherCost" component={OtherCostStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
