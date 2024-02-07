import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { encode } from 'base-64';
import Carousel from 'react-native-reanimated-carousel';
import Product from '../../services/product';

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
            <View className='flex'>

                {/* Header */}
                {/* <View className='flex flex-row bg-white w-full py-1'>

                    <Pressable
                        className='px-3 py-4 bg-slate-400 rounded flex-1 mx-3' 
                        onPress={() => {}}
                    >
                        <Text className='text-center text-black'>Back</Text>
                    </Pressable>
                    <Pressable
                        className='px-3 py-4 bg-slate-400 rounded flex-1 mx-3' 
                        onPress={() => {}}
                    >
                        <Text className='text-center text-black'>Back</Text>
                    </Pressable>

                </View> */}
                {/* End */}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
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
                    <View className='p-4'>
                        <Text className='text-xl font-bold'>
                            {product.name}
                        </Text>
                        <Text className='text-base'>
                            {product.description.replace(/<[^>]*>?/gm, '')}
                        </Text>
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
                        className='px-3 py-4 bg-slate-400 rounded flex-1 mx-3' 
                        onPress={() => {}}
                    >
                        <Text className='text-center'>Add To Card</Text>
                    </Pressable>
                    
                    <Pressable
                        className='px-3 py-4 bg-[#7b51ad] rounded flex-1 mx-3' 
                        onPress={() => {}}
                    >
                        <Text className='text-white text-center'>Buy Now</Text>
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

export default Landing;