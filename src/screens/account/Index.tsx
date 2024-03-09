import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Image } from "react-native";
import Customer from '../../services/customer';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { loginRequest, logoutRequest } from '../../redux/slices/auth';

const Login = (props: Object) => {

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
                        dispatch(loginRequest({ email, password }));
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

const Profile = () => {
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    console.log(auth);
    return (
        <>
            <View className="p-3">
                <View className="flex flex-row items-center bg-gray-300 rounded-md p-2">
                    <View className="p-2">
                        <Image
                            className="w-80 h-80 rounded-full"
                            style={{ width: 80, height: 80 }}
                            source={{
                                uri: auth?.user?.profileImage,
                            }}
                        />
                    </View>
                    <View className="flex flex-col p-2">
                        <Text className="text-2xl">{auth?.user?.name}</Text>
                        <Text className="text-lg">{auth?.user?.email}</Text>
                    </View>
                </View>
                <View>
                    <View className="flex flex-row mt-4">
                        <Pressable className="flex-1 mr-2" onPress={() => {}}>
                            <View className='p-2 bg-slate-500 rounded'>
                                <Text className='text-center text-base text-white'>
                                    Orders
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable className="flex-1 ml-2" onPress={() => {}}>
                            <View className='p-2 bg-slate-500 rounded'>
                                <Text className='text-center text-base text-white'>
                                    Acount Details
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                    <View className="flex flex-row mt-4">
                        <Pressable className="flex-1 mr-2" onPress={() => {}}>
                            <View className='p-2 bg-slate-500 rounded'>
                                <Text className='text-center text-base text-white'>
                                    Billing
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable className="flex-1 ml-2" onPress={() => {}}>
                            <View className='p-2 bg-slate-500 rounded'>
                                <Text className='text-center text-base text-white'>
                                    Shipping
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                    <View className="flex flex-row mt-4">
                        <Pressable className="flex-1" onPress={() => {
                            dispatch(logoutRequest());
                        }}>
                            <View className='p-2 bg-slate-500 rounded'>
                                <Text className='text-center text-base text-white'>
                                    Logout
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )
}

export default () => {

    const auth = useAppSelector((state) => state.auth);

    return (
        <>
            {
                auth.token ?
                    <Profile />
                    :
                    <Login />
            }
        </>
    )
}