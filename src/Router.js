import { map, mapValues, get } from 'lodash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { CONFIG_REDUCER } from './store';
import { setCommonStore, setPartialCommonStore, setSimBoxConnectionAlive } from './store/action-creator/config';
import { connectToSocket, socket } from './services/socket';
import { handleKnobEvent, requestSimData } from './services/sim-data';
import NoConnection from './screens/NoConnection';
import NoSim from './screens/NoSim';
import NoAircraftConfig from './screens/NoAircraftConfig';
import screens from './config/screens';
import Menu from './tiles/Menu';
import ScreenWrapper from './components/ScreenWrapper';

const Stack = createNativeStackNavigator();

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
    aircraftConfig
}) {
    const [socketConnected, setSocketConnected] = useState(false);

    const masterConnectionEstablished = socketConnected && simBoxConnectionAlive;

    useEffect(() => {
        if (masterConnectionEstablished && aircraftConfig) {
            requestSimData();
        }
    }, [masterConnectionEstablished, aircraftConfig]);

    useEffect(() => {
        connectToSocket();

        socket.on('connect', () => {
            setSocketConnected(true);
            socket.emit('setCommonStoreProperty', { key: 'aircraftConfig', value: 'A32X_MSFS2020' });
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

            if (eventName === 'knobEvent') {
                handleKnobEvent(payload);
            }
        });
    }, []);

    if (!masterConnectionEstablished) {
        // return <NoConnection />;
    }

    if (!xPlane11 && !MSFS2020) {
        return <NoSim />;
    }

    if (!aircraftConfig) {
        return <NoAircraftConfig />;
    }

    return (
        <NavigationContainer linking={__DEV__ ? linking : null}>
            <Stack.Navigator>
                {map(screens, ({ component: Component }, name) => (
                    <Stack.Screen name={name} component={() => <ScreenWrapper><Component /></ScreenWrapper>} options={{ header: (props) => <Menu {...props} /> }} />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

Router = connect(
    ({ [CONFIG_REDUCER]: { commonStore, simBoxConnectionAlive } }) => ({
        simBoxConnectionAlive,
        xPlane11: get(commonStore, 'xPlane11'),
        MSFS2020: get(commonStore, 'MSFS2020'),
        aircraftConfig: get(commonStore, 'aircraftConfig')
    }),
    { setCommonStore, setSimBoxConnectionAlive, setPartialCommonStore }
)(Router);

export default Router;
