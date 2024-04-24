import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Screens/Login";
import AttendanceScreen from "./Screens/Attendence";
import ProfileScreen from "./Screens/Profile";
import OtherCostScreen from "./Screens/OtherCost";
import Navigator from "./Navigation/Navigator";
import SignupScreen from "./Screens/Signup";

export default function App() {
  return (
    <>
      <Navigator />
      {/* <SignupScreen /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
