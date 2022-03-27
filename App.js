import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import store from './src/store';
import Router from './src/Router';
import { FONT_DIGITAL, FONT_STANDARD } from './src/config/const';

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export default function App() {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            Font.loadAsync({
                [FONT_DIGITAL]: require('./src/asset/font/digital-7-mono.ttf'),
                [FONT_STANDARD]: require('./src/asset/font/Nurom-Bold.ttf')
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
        <Container>
            <Provider store={store}>
                <Router />
            </Provider>

            <StatusBar hidden />
        </Container>
    );
}
