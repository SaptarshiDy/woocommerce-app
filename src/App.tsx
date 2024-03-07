import React from 'react';
import { store } from '../src/redux/store';
import { Provider } from "react-redux";
import Guest from './layouts/Guest';
import Auth from './layouts/Auth';

const App = () => <Provider store={store}><Auth/></Provider>;

export default App;
