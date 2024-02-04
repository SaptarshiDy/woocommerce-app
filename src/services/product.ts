import axios from 'axios';
import { encode } from 'base-64';
import { WoocommerceUserName, WoocommercePassword } from '../../config';

const list = async (page: Number, perPage: Number, search: any) => {
    const base64Credentials = encode(`${WoocommerceUserName}:${WoocommercePassword}`);
    const apiUrl = 'https://dietgeine.com/woocoom/wp-json/wc/v3/products';

    let response = await axios.get(apiUrl, {
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
        },
        params: {
            page: page,
            per_page: perPage,
            search: search,
        }
    });

    return response.data;
}

const view = async (productId: Number) => {
    const base64Credentials = encode(`${WoocommerceUserName}:${WoocommercePassword}`);
    const apiUrl = 'https://dietgeine.com/woocoom/wp-json/wc/v3/products/' + productId;

    let response = await fetch(apiUrl, {
        method: 'get',
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}

export default { list, view };