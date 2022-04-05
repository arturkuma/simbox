import _, { camelCase, find, forEach, get, map, has, isArray } from 'lodash';
import { socket } from './socket';
import store, { CONFIG_REDUCER } from '../store';
import { MSFS2020, XPLANE11 } from '../enum/Simulator';

function getCurrentAircraftConfig() {
    const { aircraftConfigs } = store.getState()[CONFIG_REDUCER];
    const selectedAircraft = get(store.getState()[CONFIG_REDUCER].commonStore, 'aircraftConfig');

    if (!selectedAircraft) {
        return;
    }

    const aircraftConfig = aircraftConfigs[selectedAircraft];

    if (!aircraftConfig) {
        return;
    }

    return aircraftConfig;
}

function getSimValue(key) {
    let value = null;

    const config = store.getState()[CONFIG_REDUCER];

    const aircraftConfig = getCurrentAircraftConfig();

    if (aircraftConfig.simulator === XPLANE11) {
        value = get(config, ['commonStore', 'refs', key]);
    }

    if (aircraftConfig.simulator === MSFS2020) {
        value = get(config, ['commonStore', 'simVars', key]);
    }

    return value;
}

function emitActionInfo(name) {
    socket.emit('action', name);
}

export { getSimValue, emitActionInfo };
