// AttendanceScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const AttendanceScreen = () => {
    const [isClocking, setIsClocking] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        })();
    }, []);

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    const handleClock = () => {
        setIsClocking(prevState => !prevState);
        if (!isClocking) {
            const now = new Date();
            setStartTime(now);
            getLocation();
        } else {
            const now = new Date();
            setEndTime(now);
            getLocation();
        }
    };

    const renderClockButton = () => {
        if (isClocking) {
            return (
                <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={handleClock}>
                    <Text style={styles.buttonText}>Stop Clock</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.button} onPress={handleClock}>
                    <Text style={styles.buttonText}>Start Clock</Text>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Attendance</Text>
            <View style={styles.clockContainer}>
                {isClocking && (
                    <Text style={styles.clockText}>Clock In Time: {startTime ? startTime.toLocaleTimeString() : ''}</Text>
                )}
                {!isClocking && (
                    <Text style={styles.clockText}>Clock Out Time: {endTime ? endTime.toLocaleTimeString() : ''}</Text>
                )}
                {location && (
                    <Text style={styles.locationText}>
                        Location: {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
                    </Text>
                )}
                {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
            </View>
            {renderClockButton()}
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
    clockContainer: {
        marginBottom: 20,
    },
    clockText: {
        fontSize: 18,
        marginBottom: 10,
    },
    locationText: {
        fontSize: 16,
        marginBottom: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
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
    stopButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AttendanceScreen;
