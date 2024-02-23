import React, { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import Customer from '../../services/customer';

export default () => {

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');

    const loginRequest = async () => {
        console.log("login request");
        const reposne = await Customer.login(email, password);
        console.log(reposne);
    }

    return (
        <View className="flex flex-col justify-center items-center h-screen p-4">
            
            <View className="w-full mt-4">
                <TextInput
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                    placeholder="Enter Email"
                    className="border-2 border-[#7b51ad] rounded-lg text-lg px-4"
                />
                <TextInput
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                    placeholder="Enter Password"
                    className="mt-4 border-2 border-[#7b51ad] rounded-lg text-lg px-4"
                />
            </View>

            <View className="w-full flex flex-row mt-4">
                <Pressable
                    className="flex-1 mr-2"
                    onPress={() => {
                        loginRequest();
                    }}
                >
                    <View className='bg-slate-500 rounded p-3'>
                        <Text className='text-center text-base text-white'>
                            Login
                        </Text>
                    </View>
                </Pressable>
                <Pressable
                    className="flex-1 ml-2"
                    onPress={() => {
                    //
                    }}
                >
                    <View className='bg-slate-500 rounded p-3'>
                        <Text className='text-center text-base text-white'>
                            Registration
                        </Text>
                    </View>
                </Pressable>
            </View>

        </View>
    );
}