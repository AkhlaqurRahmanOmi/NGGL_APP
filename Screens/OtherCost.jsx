// OtherCostScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const OtherCostScreen = () => {
    const [costTitle, setCostTitle] = useState('');
    const [costDescription, setCostDescription] = useState('');
    const [costType, setCostType] = useState('');
    const [costAmount, setCostAmount] = useState('');
    const [clientName, setClientName] = useState('');

    const handleSubmit = () => {
        // Handle submission of the other cost form
        // Here you can send the form data to your backend for processing
        console.log('Submitting other cost form...');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Other Cost</Text>
            <TextInput
                style={styles.input}
                value={costTitle}
                onChangeText={setCostTitle}
                placeholder="Cost Title"
            />
            <TextInput
                style={styles.input}
                value={costDescription}
                onChangeText={setCostDescription}
                placeholder="Cost Description"
            />
            <Picker
                style={styles.input}
                selectedValue={costType}
                onValueChange={(itemValue) => setCostType(itemValue)}
            >
                <Picker.Item label="Select Cost Type" value="" />
                <Picker.Item label="Type 1" value="Type 1" />
                <Picker.Item label="Type 2" value="Type 2" />
                {/* Add more cost types as needed */}
            </Picker>
            <TextInput
                style={styles.input}
                value={costAmount}
                onChangeText={setCostAmount}
                placeholder="Cost Amount"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={clientName}
                onChangeText={setClientName}
                placeholder="Client Name"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OtherCostScreen;