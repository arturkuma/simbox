import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import store from './src/store';
import Router from './src/Router';

export default function App() {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            Font.loadAsync({
                FONT_DIGITAL: require('./src/asset/font/digital-7-mono.ttf'),
                FONT_STANDARD: require('./src/asset/font/Nurom-Bold.ttf')
            })
        ]).then(() => {
            setAssetsLoaded(true);
        });
    }, []);

    const canRender = () => [assetsLoaded].indexOf(false) === -1;

    if (!canRender()) {
        return <View />;
    }

    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}
