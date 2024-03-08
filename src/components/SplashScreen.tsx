import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Run your custom functions and API calls here
        fetchData().then(() => {
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            // Handle error state if necessary
            setLoading(false);
        });
    }, []);

    const fetchData = async () => {
        // Example API call
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log("Fetched data:", data);
        // Process data as needed
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
                    <Text>Splash Screen Content</Text>
                    {/* Additional UI components can be rendered here */}
                </View>
            )}
        </View>
    );
};

export default SplashScreen;