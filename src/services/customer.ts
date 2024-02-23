import axios from 'axios';

const login = async (email: String, password: String) => {
    const apiUrl = 'https://dietgeine.com/woocoom/wp-json/jwt-auth/v1/token';

    let response = await axios.post(apiUrl, {
        'username': 'hello@gmail.com',
        'password': 'pass@admin',
    });

    return response.data;
}

export default { login };