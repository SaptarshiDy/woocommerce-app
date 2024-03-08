import React, { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import Customer from '../../services/customer';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { loginRequest, logoutRequest } from '../../redux/slices/auth';

const Login = (auth: Object) => {

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const dispatch = useAppDispatch();

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
                            // console.log(email, password);
                            dispatch(loginRequest({email, password}));
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

export default () => {

    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    return (
        <>
            {
                auth.token ? 
                    <View className="flex flex-col h-screen justify-center items-center">
                        <Text className="text-2xl">{auth?.user?.name}</Text>
                        <Text className="text-lg">{auth?.user?.email}</Text>
                        <View className="w-full flex flex-row mt-4">
                            <Pressable
                                className="flex-1 mx-2"
                                onPress={() => {
                                    dispatch(logoutRequest());
                                }}
                            >
                                <View className='bg-slate-500 rounded p-3'>
                                    <Text className='text-center text-base text-white'>
                                        Log Out
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                :
                    <Login auth={auth} />
            }
        </>
    )
}