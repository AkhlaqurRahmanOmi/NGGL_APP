// OtherCostScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const OtherCostScreen = () => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [totalTaxAmount, setTotalTaxAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [billCopy, setBillCopy] = useState(null);
  const [expenseDateInput, setExpenseDateInput] = useState("");

  const handleSubmit = async () => {
    try {
      const expenseData = {
        name: expenseTitle,
        department_id: departmentId,
        total_amount: totalAmount,
        paid_by: paidBy,
        total_tax_amount: totalTaxAmount,
        expense_date: expenseDateInput
          ? expenseDateInput
          : expenseDate.toISOString().split("T")[0],
      };

      // Send POST request to backend API
      const response = await fetch("http://192.168.56.1:3000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        // Reset form fields after successful submission
        setExpenseTitle("");
        setDepartmentId("");
        setTotalAmount("");
        setPaidBy("");
        setTotalTaxAmount("");
        setExpenseDate(new Date());
        setExpenseDateInput("");
        setBillCopy(null);

        Alert.alert("Success", "Expense submitted successfully.");
      } else {
        throw new Error("Failed to submit expense");
      }
    } catch (error) {
      console.error("Error submitting expense:", error);
      Alert.alert("Error", "Failed to submit expense. Please try again.");
    }
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.type === "success") {
        setBillCopy(result);
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick document. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      <TextInput
        style={styles.input}
        value={expenseTitle}
        onChangeText={setExpenseTitle}
        placeholder="Expense Title"
      />
      <TextInput
        style={styles.input}
        value={departmentId}
        onChangeText={setDepartmentId}
        placeholder="Department ID"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={totalAmount}
        onChangeText={setTotalAmount}
        placeholder="Total Amount"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={totalTaxAmount}
        onChangeText={setTotalTaxAmount}
        placeholder="Total Tax Amount"
        keyboardType="numeric"
      />
      <Picker
        style={styles.input}
        selectedValue={paidBy}
        onValueChange={(itemValue) => setPaidBy(itemValue)}
      >
        <Picker.Item label="Select Paid By" value="" />
        <Picker.Item label="Paid By 1" value="Paid By 1" />
        <Picker.Item label="Paid By 2" value="Paid By 2" />
        {/* Add more options as needed */}
      </Picker>
      <View style={styles.dateInputContainer}>
        <TextInput
          style={styles.dateInput}
          value={expenseDateInput}
          onChangeText={setExpenseDateInput}
          placeholder="Expense Date (YYYY-MM-DD)"
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>Choose Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={expenseDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setExpenseDate(selectedDate);
                setExpenseDateInput(selectedDate.toISOString().split("T")[0]);
              }
            }}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handlePickDocument}
      >
        <Text style={styles.uploadButtonText}>Upload Bill Copy (PDF)</Text>
      </TouchableOpacity>
      {billCopy && <Text style={styles.fileName}>{billCopy.name}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
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
  uploadButton: {
    width: "100%",
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  fileName: {
    fontSize: 16,
    marginBottom: 10,
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
});

export default OtherCostScreen;
