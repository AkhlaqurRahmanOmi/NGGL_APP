import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignupScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [joinDate, setJoinDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [joinDateInput, setjoinDateInput] = useState("");

  const handleSignup = async () => {
    try {
      const signupData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        hire_date: joinDateInput
          ? joinDateInput
          : joinDate.toISOString().split("T")[0],
        // Add other fields as needed
      };

      const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setJoinDate(new Date());
        setJoinDateInput("");

        Alert.alert("Success", "Signup successful!");
      } else {
        throw new Error("Failed to signup");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert("Error", "Failed to signup. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.dateInputContainer}>
        <TextInput
          style={styles.dateInput}
          value={joinDateInput}
          onChangeText={setjoinDateInput}
          placeholder="Join Date Date (YYYY-MM-DD)"
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>Choose Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={joinDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setJoinDate(selectedDate);
                setjoinDateInput(selectedDate.toISOString().split("T")[0]);
              }
            }}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dateInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
  },
  datePickerText: {
    marginLeft: 10,
    color: "blue",
    fontSize: 18,
  },
});

export default SignupScreen;
