import _, { camelCase, find, forEach, get, map, has, isArray } from 'lodash';
import { socket } from './socket';
import store, { CONFIG_REDUCER } from '../store';
import aircraft from '../config/aircraft/aircraft';
import { MSFS2020, XPLANE11 } from '../enum/Simulator';

function getCurrentAircraftConfig() {
    const selectedAircraft = get(store.getState()[CONFIG_REDUCER].commonStore, 'aircraftConfig');

    if (!selectedAircraft) {
        return;
    }

    const aircraftConfig = aircraft[selectedAircraft];

    if (!aircraftConfig) {
        return;
    }

    return aircraftConfig;
}

function requestSimData() {
    const aircraftConfig = getCurrentAircraftConfig();

    if (aircraftConfig.simulator === MSFS2020) {
        const requestedSimVars = [];

        forEach(aircraftConfig.store, (config) => {
            const { simVar = null } = config;

            if (simVar) {
                requestedSimVars.push(simVar);
            }
        });

        socket.emit('setCommonStoreProperty', { key: 'requestedSimVars', value: requestedSimVars });
    } else if (aircraftConfig.simulator === XPLANE11) {
        const requestedRefs = [];

        forEach(aircraftConfig.store, (config) => {
            const { ref = null } = config;

            if (ref) {
                requestedRefs.push(ref);
            }
        });

        socket.emit('setCommonStoreProperty', { key: 'requestedRefs', value: requestedRefs });
    }
}

function getSimValue(key) {
    let value = null;

    const config = store.getState()[CONFIG_REDUCER];
    const { commonStore } = config;

    const aircraftConfig = getCurrentAircraftConfig();

    let parseConfig = get(aircraftConfig, ['store', key, 'parse']);

    if (aircraftConfig.simulator === XPLANE11) {
        const refKey = get(aircraftConfig, ['store', key, 'ref']);

        if (refKey) {
            value = get(commonStore, ['refs', refKey]);
        }
    }

    if (aircraftConfig.simulator === MSFS2020) {
        const simVarKey = get(aircraftConfig, ['store', key, 'simVar', 0]);

        if (simVarKey) {
            value = get(commonStore, ['simVars', simVarKey]);
        }
    }

    if (parseConfig) {
        if (isArray(parseConfig)) {
            parseConfig = parseConfig.join(' ');
        }

        // eslint-disable-next-line no-new-func
        const parseFunction = new Function(key, 'getStoreValue', '_', parseConfig);
        value = parseFunction(value, getSimValue, _);
    }

    return value;
}

function emitActionInfo(name) {
    const aircraftConfig = getCurrentAircraftConfig();

    const eventsToSend = get(aircraftConfig, ['actions', 'buttons', name, 'events']);

    if (aircraftConfig.simulator === XPLANE11) {
        forEach(eventsToSend, (eventName) => {
            socket.emit('xplaneEvent', eventName);
        });
    }

    if (aircraftConfig.simulator === MSFS2020) {
        forEach(eventsToSend, (event) => {
            if (has(event, 'setSimVar')) {
                socket.emit('setSimVar', event.setSimVar);
            }
        });
    }
}

function handleKnobEvent(name) {
    const aircraftConfig = getCurrentAircraftConfig();

    const { activeSlot } = store.getState()[CONFIG_REDUCER].commonStore;

    const activeSlotConfig = get(aircraftConfig, ['actions', 'knob', camelCase(activeSlot)]);

    if (!activeSlotConfig) {
        return;
    }

    const foundConfig = find(activeSlotConfig, ({ inputEvents }) => inputEvents.indexOf(name) >= 0);

    map(get(foundConfig, 'events'), (event) => {
        if (aircraftConfig.simulator === XPLANE11) {
            socket.emit('xplaneEvent', event);
        }

        if (aircraftConfig.simulator === MSFS2020) {
            if (has(event, 'setSimVar')) {
                // eslint-disable-next-line prefer-const
                let [simVarName, simVarType, simVarValue] = event.setSimVar;

                if (has(simVarValue, 'parse')) {
                    // eslint-disable-next-line no-new-func
                    const parseFunction = new Function('getStoreValue', '_', get(simVarValue, 'parse'));
                    simVarValue = parseFunction(getSimValue, _);
                }

                socket.emit('setSimVar', [simVarName, simVarType, simVarValue]);
            }
        }
    });
}

export { requestSimData, getSimValue, emitActionInfo, handleKnobEvent };
