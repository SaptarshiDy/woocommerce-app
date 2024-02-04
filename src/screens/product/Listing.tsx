import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';

import Product from '../../services/product';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 0;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

const Landing = (props: any) => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProducts = async () => {
        let response = await Product.list(currentPage, 10, null);
        setProducts(prevState => [...prevState, ...response]);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <View className='flex bg-white'>

            <Header
                onSearch={(query: String) => {
                    // if (query.length !== 0) {
                    //     setProducts([]);
                    //     setCurrentPage(0);
                    //     fetchProducts(query)
                    // }
                }}
            />

            {
                products.length !== 0 ? 
        
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flexShrink: 1,
                    }}
                    className='flex-row flex-wrap'
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            setCurrentPage(currentPage + 1);
                            fetchProducts();
                        }
                    }}
                    scrollEventThrottle={400}
                >
                    {
                        products.map((product: any) =>
                            <View 
                                key={product.id}
                                className='left-0 top-0 h-1/2 w-1/2 p-2'
                            >

                                <View className='flex gap-1 p-2'>
                                    <Image
                                        className='h-48'
                                        source={{
                                            uri: product.images[0].src,
                                        }}
                                    />
                                    <Text 
                                        onPress={() => {
                                            // navigation.navigate('Product View', { names: ['Brent', 'Satya', 'Michaś'] })
                                        }} 
                                        className='font-semibold text-gray-700 text-base'
                                    >
                                        {product.name}
                                    </Text>
                                    <Text numberOfLines={1}>
                                        {product.description.replace(/<[^>]*>?/gm, '')}
                                    </Text>
                                    <Text className='font-semibold text-gray-700 text-base'>
                                        {product.price} $
                                    </Text>

                                    {/* <View className='flex justify-start items-start'>
                                        <Rating
                                            showRating={false}
                                            ratingCount={5}
                                            imageSize={18}
                                            startingValue={product.average_rating}
                                            fractions={2}
                                        />
                                    </View> */}

                                    <Pressable onPress={() => {
                                        props.navigation.navigate('ProductView', {productId: product.id})
                                    }}>
                                        <View className='p-1 bg-slate-500 rounded'>
                                            <Text className='text-center text-base text-white'>
                                                View Product
                                            </Text>
                                        </View>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => {
                                            
                                        }}
                                    >
                                        <View className='p-1 bg-slate-500 rounded'>
                                            <Text className='text-center text-base text-white'>
                                                Add To Card
                                            </Text>
                                        </View>
                                    </Pressable>
                                    
                                </View>
                            </View>
                        )
                    }
                </ScrollView>
                :
                <View>
                    <Text>Loading</Text>
                </View>
            }
        </View>
    );
};

const Header = ({onSearch}) => {

    const [search, setSearch] = useState('');

    return (
        <View className='p-2'> 
            <TextInput
                value={search}
                onChangeText={(value) => {
                    setSearch(value);    
                    onSearch(value); 
                }}
                className='my-0 border-2 border-[#7b51ad] rounded-lg text-lg px-4'
                placeholder='Looking for somthing'
            />
        </View>
    )

}

export default Landing;