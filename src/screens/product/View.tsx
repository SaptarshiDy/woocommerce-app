import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
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

            </View>
            :
            <View>
                <Text>Loading</Text>
            </View>
    );
};

export default Landing;