import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, Pressable, StyleSheet, TextInput } from 'react-native';
import { encode } from 'base-64';
import Carousel from 'react-native-reanimated-carousel';
import Product from '../../services/product';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const Landing = (props: any) => {

    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        let response = await Product.view(props.route.params.productId);
        setProduct(response);
    };

    useEffect(() => {
        fetchProduct();
    }, [])

    const { width, height } = Dimensions.get('window');

    return (
        product ?
            <View className='flex-1'>

                {/* Header */}
                <View className='flex flex-row bg-white w-full py-1 px-2'>

                    <Pressable
                        className='bg-gray-300 rounded flex-none justify-center items-center px-4 mr-2'
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                    >
                        <IoniconsIcon
                            name="arrow-back"
                            size={22}
                            color="#808080"
                        >
                        </IoniconsIcon>
                    </Pressable>

                    <View className='flex-1'>
                        <Search
                            onSearch={() => { }}
                        >
                        </Search>
                    </View>

                    {/* <Pressable
                            className='px-3 py-4 bg-slate-400 rounded flex-1 mx-3'
                            onPress={() => { 
                                props.navigation.goBack();
                            }}
                        >
                            <Text className='text-center text-black'>
                                Search
                            </Text>
                        </Pressable> */}

                </View>
                {/* End */}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexShrink: 1,
                        paddingBottom: 60,
                    }}
                    className='flex-row flex-wrap'
                >
                    <View>
                        <FlatList
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            data={product.images}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <View
                                        style={{
                                            width: width,
                                            height: height / 2,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                flex: 1,
                                                width: null,
                                                height: null,
                                                resizeMode: 'cover',
                                            }}
                                            source={{
                                                uri: item.src,
                                            }}
                                        />
                                    </View>
                                )
                            }}
                        />
                    </View>

                    <View className='p-4'>
                        <Text className='text-xl font-bold'>
                            {product.name}
                        </Text>
                        <Text className='text-base'>
                            {product.description.replace(/<[^>]*>?/gm, '')}
                        </Text>
                    </View>
                </ScrollView>

                {/* Footer */}
                <View className='absolute left-0 right-0 bottom-0 flex flex-row bg-white w-full py-1'>

                    <Pressable
                        className='px-3 py-2 border border-[#9e9e9e] rounded flex-1 ml-2 mr-1'
                        onPress={() => { }}
                    >
                        <Text className='text-gray-800 text-center text-base font-normal'>Add To Card</Text>
                    </Pressable>

                    <Pressable
                        className='px-3 py-2 bg-[#7b51ad] rounded flex-1 ml-1 mr-2'
                        onPress={() => { }}
                    >
                        <Text className='text-white text-center text-lg font-normal'>Buy Now</Text>
                    </Pressable>

                </View>
                {/* End */}

            </View>
            :
            <View className="flex h-5/6 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#8359b5" />
            </View>
    );
};

const Search = ({ onSearch }) => {

    const [search, setSearch] = useState('');

    return (
        <View>
            <TextInput
                value={search}
                onChangeText={(value) => {
                    setSearch(value);
                    onSearch(value);
                }}
                className='my-0 border-2 border-[#7b51ad] rounded-lg text-lg px-4 w-full'
                placeholder='Looking for somthing'
                placeholderTextColor="#6b6b6b"
            />
        </View>
    )

}
export default Landing;