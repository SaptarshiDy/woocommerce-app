import axios from 'axios';
import { encode } from 'base-64';

const list = async (page: Number, perPage: Number, search: any) => {
    const username = 'ck_ba71fde15a916827fab04f79905c37399c28d227';
    const password = 'cs_e6a12fae81e7b990885e94a21984251413c3e2e9';
    const base64Credentials = encode(`${username}:${password}`);
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
    const username = 'ck_ba71fde15a916827fab04f79905c37399c28d227';
    const password = 'cs_e6a12fae81e7b990885e94a21984251413c3e2e9';
    const base64Credentials = encode(`${username}:${password}`);
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