// ProfileScreen.js

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo

const ProfileScreen = () => {
    // Dummy data for the profile
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('John Doe');
    const [designation, setDesignation] = useState('Software Engineer');

    const handleEditName = () => {
        setIsEditing(true);
    };

    const handleSaveName = () => {
        setIsEditing(false);
        // Here you can save the updated name to your backend or state management system
    };
    const handleViewReport = () => {

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.editIcon} onPress={handleEditName}>
                <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
            <MaterialIcons name="account-circle" size={150} color="gray" style={styles.icon} />
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    onBlur={handleSaveName}
                    autoFocus // Automatically focus on the input field when editing
                />
            ) : (
                <>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.designation}>{designation}</Text>
                </>
            )}
            <TouchableOpacity style={styles.button} onPress={handleViewReport}>
                <Text style={styles.buttonText}>View Full Month Report</Text>
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
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    icon: {
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    designation: {
        fontSize: 18,
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

export default ProfileScreen;
