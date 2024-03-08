import React from 'react';
import { store } from '../src/redux/store';
import { Provider } from "react-redux";

import BaseLayout from './layouts/Base';
import AuthLayout from './layouts/Auth';
import GuestLayout from './layouts/Guest';

const App = () => {
    return (
        <>
            <Provider store={store}>
                <BaseLayout>
                    <AuthLayout/>
                </BaseLayout>
            </Provider>
        </>
    )
};

export default App;
