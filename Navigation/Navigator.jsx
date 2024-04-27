import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import LoginScreen from "../Screens/Login";
import AttendanceScreen from "../Screens/Attendence";
import OtherCostScreen from "../Screens/OtherCost";
import ProfileScreen from "../Screens/Profile";
import SignupScreen from "../Screens/Signup";
import Leave from "../Screens/Leave";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen
      name="Leave"
      component={Leave}
      options={{ headerShown: false }}
    /> */}
  </Stack.Navigator>
);

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

const MainNavigator = () => {
  return (
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
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Leave" component={Leave} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
