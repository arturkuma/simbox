import { map, mapValues, get } from 'lodash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { CONFIG_REDUCER } from './store';
import {
    setAircraftConfigs,
    setCommonStore,
    setPartialCommonStore,
    setSimBoxConnectionAlive
} from './store/action-creator/config';
import { connectToSocket, socket } from './services/socket';
import NoConnection from './screens/NoConnection';
import NoSim from './screens/NoSim';
import NoAircraftConfig from './screens/NoAircraftConfig';
import screens from './config/screens';
import Menu from './tiles/Menu';
import ScreenWrapper from './components/ScreenWrapper';
import NoAircraftConfigExists from './screens/NoAircraftConfigExists';

const Stack = createNativeStackNavigator();

const SimpleScreenWrapper = styled(ScreenWrapper)`
  padding: 0;
`;

const linking = {
    prefixes: [],
    config: {
        screens: mapValues(screens, ({ route }) => route)
    }
};

function Router({
    setCommonStore,
    xPlane11,
    MSFS2020,
    simBoxConnectionAlive,
    setSimBoxConnectionAlive,
    setPartialCommonStore,
    aircraftConfig,
    aircraftConfigExist,
    setAircraftConfigs
}) {
    const [socketConnected, setSocketConnected] = useState(false);

    const masterConnectionEstablished = socketConnected && simBoxConnectionAlive;

    useEffect(() => {
        connectToSocket();

        socket.on('connect', () => {
            setSocketConnected(true);
        });

        socket.on('disconnect', () => {
            setSocketConnected(false);
        });

        socket.onAny((eventName, payload) => {
            if (eventName === 'commonStore') {
                setCommonStore(payload);
            }

            ['simVars', 'refs'].forEach((varName) => {
                if (eventName === `${varName}Update`) {
                    setPartialCommonStore({ [varName]: payload });
                }
            });

            if (eventName === 'simBoxConnectionAlive') {
                setSimBoxConnectionAlive(payload);
            }

            if (eventName === 'aircraftConfigs') {
                setAircraftConfigs(payload);
            }
        });
    }, []);

    if (!masterConnectionEstablished) {
        return <SimpleScreenWrapper><NoConnection /></SimpleScreenWrapper>;
    }

    if (!xPlane11 && !MSFS2020) {
        return <SimpleScreenWrapper><NoSim /></SimpleScreenWrapper>;
    }

    if (!aircraftConfig) {
        return <SimpleScreenWrapper><NoAircraftConfig /></SimpleScreenWrapper>;
    }

    if (!aircraftConfigExist) {
        return <SimpleScreenWrapper><NoAircraftConfigExists /></SimpleScreenWrapper>;
    }

    return (
        <NavigationContainer linking={__DEV__ ? linking : null}>
            <Stack.Navigator screenOptions={{ animationEnabled: false }}>
                {map(screens, ({ component: Component }, name) => (
                    <Stack.Screen name={name} options={{ header: (props) => <Menu {...props} /> }}>
                        {() => <ScreenWrapper><Component /></ScreenWrapper>}
                    </Stack.Screen>
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

Router = connect(
    ({ [CONFIG_REDUCER]: { commonStore, aircraftConfigs, simBoxConnectionAlive } }) => ({
        simBoxConnectionAlive,
        xPlane11: get(commonStore, 'xPlane11'),
        MSFS2020: get(commonStore, 'MSFS2020'),
        aircraftConfig: get(commonStore, 'aircraftConfig'),
        aircraftConfigExist: !!get(aircraftConfigs, [get(commonStore, 'aircraftConfig')])
    }),
    { setCommonStore, setSimBoxConnectionAlive, setPartialCommonStore, setAircraftConfigs }
)(Router);

export default Router;
