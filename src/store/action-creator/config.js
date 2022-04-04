import {
    SET_AIRCRAFT_CONFIGS,
    SET_COMMON_STORE,
    SET_PARTIAL_COMMON_STORE_UPDATE,
    SET_SIMBOX_CONNECTION_ALIVE
} from '../actions';
import { socket } from '../../services/socket';

export const setActiveSlot = (activeSlot) => {
    socket.emit('setCommonStoreProperty', { key: 'activeSlot', value: activeSlot });

    return {
        type: SET_PARTIAL_COMMON_STORE_UPDATE,
        commonStorePartial: { activeSlot }
    };
};

export const setCommonStore = (commonStore) => ({
    type: SET_COMMON_STORE,
    commonStore
});

export const setAircraftConfigs = (aircraftConfigs) => ({
    type: SET_AIRCRAFT_CONFIGS,
    aircraftConfigs
});

export const setSimBoxConnectionAlive = (simBoxConnectionAlive) => ({
    type: SET_SIMBOX_CONNECTION_ALIVE,
    simBoxConnectionAlive
});

export const setPartialCommonStore = (commonStorePartial) => ({
    type: SET_PARTIAL_COMMON_STORE_UPDATE,
    commonStorePartial
});
