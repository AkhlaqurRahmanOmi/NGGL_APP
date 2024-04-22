// OtherCostScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';

const OtherCostScreen = () => {
    const [costTitle, setCostTitle] = useState('');
    const [costDescription, setCostDescription] = useState('');
    const [costType, setCostType] = useState('');
    const [costAmount, setCostAmount] = useState('');
    const [clientName, setClientName] = useState('');
    const [billCopy, setBillCopy] = useState(null);

    const handleSubmit = () => {
        // Handle submission of the other cost form
        // Here you can send the form data to your backend for processing
        console.log('Submitting other cost form...');
    };

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
            if (result.type === 'success') {
                setBillCopy(result);
            }
        } catch (error) {
            console.log('Error picking document:', error);
            Alert.alert('Error', 'Failed to pick document. Please try again.');
        }
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
            <TouchableOpacity style={styles.uploadButton} onPress={handlePickDocument}>
                <Text style={styles.uploadButtonText}>Upload Bill Copy (PDF)</Text>
            </TouchableOpacity>
            {billCopy && (
                <Text style={styles.fileName}>{billCopy.name}</Text>
            )}
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
    uploadButton: {
        width: '100%',
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    fileName: {
        fontSize: 16,
        marginBottom: 10,
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
