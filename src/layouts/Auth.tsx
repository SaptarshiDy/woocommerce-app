import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import Screens
import ProductListing from '../screens/product/Listing';
import ProductView from '../screens/product/View';
import Account from '../screens/account/Index';
import Cart from '../screens/cart/Index';
import Category from '../screens/category/Index';

//Import Icons
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const TabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={ProductListing}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <>
                                <AntDesignIcon 
                                    name="home"
                                    size={30}
                                    color={focused ? '#7b51ad' : '#000'}
                                >
                                </AntDesignIcon>
                            </>
                        );
                    },
                    tabBarStyle: { 
                        paddingTop: 10,
                        paddingBottom: 10,
                    },
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name="Category"
                component={Category}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <>
                                <MaterialIcon 
                                    name="backup-table"
                                    size={30}
                                    color={focused ? '#7b51ad' : '#000'}
                                >
                                </MaterialIcon>
                            </>
                        );
                    },
                    tabBarStyle: { 
                        paddingTop: 10,
                        paddingBottom: 10,
                    },
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <>
                                <FeatherIcon 
                                    name="user"
                                    size={30}
                                    color={focused ? '#7b51ad' : '#000'}
                                >
                                </FeatherIcon>
                            </>
                        );
                    },
                    tabBarStyle: { 
                        paddingTop: 10,
                        paddingBottom: 10,
                    },
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <>
                                <FeatherIcon 
                                    name="shopping-cart"
                                    size={30}
                                    color={focused ? '#7b51ad' : '#000'}
                                >
                                </FeatherIcon>
                            </>
                        );
                    },
                    tabBarStyle: { 
                        paddingTop: 10,
                        paddingBottom: 10,
                    },
                    tabBarShowLabel: false,
                }}
            />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();
export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            >
                <Stack.Screen
                    name="TabScreens"
                    component={TabScreens}
                    options={{ headerTitle: 'Other Pages' }}
                />
                <Stack.Screen
                    name="ProductView"
                    component={ProductView}
                    options={{ headerTitle: 'Product View' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};