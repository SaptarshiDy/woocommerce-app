import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';

const Loading = () => {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View className="flex">
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View className="flex h-screen justify-center items-center bg-[#00000049]">
                    <View className="bg-[#00000031] p-10 rounded-md">
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </View>
            </Modal>            
        </View>
    );
}

export default Loading;