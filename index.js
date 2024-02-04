import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { store } from './src/redux/store'
import { Provider } from 'react-redux'

const MainApp = () => {
    return (
        // <Provider store={store}>
        //     <App />
        // </Provider>
        <App />
    );
}

AppRegistry.registerComponent(appName, () => MainApp);
