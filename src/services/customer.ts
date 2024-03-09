import axios from 'axios';
import { encode } from 'base-64';
import { WoocommerceUserName, WoocommercePassword } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (email: any, password: any) => {
    const apiUrl = 'https://dietgeine.com/woocoom/wp-json/jwt-auth/v1/token';

    const reponse = await axios.post(apiUrl, {
        'username': email,
        'password': password,
    });

    if (reponse.status === 200) {

        const res = await axios.get('https://dietgeine.com/woocoom/wp-json/wp/v2/users/me', {
            headers: {
                'Authorization': `Bearer ${reponse.data.token}`,
                'Content-Type': 'application/json',
            }
        })

        if (res.status === 200) {
            try {
                await AsyncStorage.setItem('session', reponse.data.token);
            } catch (e) {
                console.log(e);
            }
    
            return {
                token: reponse.data.token,
                user: {
                    id: res.data.id,
                    name: res.data.name,
                    username: reponse.data.user_nicename,
                    email: reponse.data.user_email,
                    profileImage: res.data.avatar_urls[res.data.avatar_urls.length - 1],
                }
            }
        }
    }
}

const logout = async () => {
    try {
        await AsyncStorage.removeItem('session');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

const session = async () => {
    const session = await AsyncStorage.getItem('session');
    if (session !== null) {
        const reponse = await axios.get('https://dietgeine.com/woocoom/wp-json/wp/v2/users/me', {
            headers: {
                'Authorization': `Bearer ${session}`,
                'Content-Type': 'application/json',
            }
        })

        if (reponse.status === 200) {
            const res = await axios.get('https://dietgeine.com/woocoom/wp-json/wp/v2/users/me', {
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Content-Type': 'application/json',
                }
            })

            if (res.status === 200) {

                const customer = await customerDetails(res.data.id);

                /**
                 * we can add a layer of security to
                 * check customer can only login
                */

                if (customer) {
                    return {
                        token: session,
                        user: {
                            id: res.data.id,
                            name: res.data.name,
                            username: customer.username,
                            email: customer.email,
                            profileImage: res.data.avatar_urls[96],
                        }
                    }
                }

            }
        }
    } else {
        return false;
    }
}

const customerDetails = async (customerId: Number) => {
    const base64Credentials = encode(`${WoocommerceUserName}:${WoocommercePassword}`);
    const apiUrl = 'https://dietgeine.com/woocoom/wp-json/wc/v3/customers/' + customerId;

    let response = await axios.get(apiUrl, {
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }

    
}



export default { login, customerDetails, session, logout };

// function sync(reponse: any): ((value: import("axios").AxiosResponse<any, any>) => import("axios").AxiosResponse<any, any> | PromiseLike<import("axios").AxiosResponse<any, any>>) | null | undefined {
//     throw new Error('Function not implemented.');
// }
