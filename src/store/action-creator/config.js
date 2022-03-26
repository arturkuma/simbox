import {
    SET_ACTIVE_SLOT,
    SET_COMMON_STORE,
    SET_PARTIAL_COMMON_STORE_UPDATE,
    SET_SIMBOX_CONNECTION_ALIVE
} from '../actions';

export const setActiveSlot = (activeSlot) => ({
    type: SET_ACTIVE_SLOT,
    activeSlot
});

export const setCommonStore = (commonStore) => ({
    type: SET_COMMON_STORE,
    commonStore
});

export const setSimBoxConnectionAlive = (simBoxConnectionAlive) => ({
    type: SET_SIMBOX_CONNECTION_ALIVE,
    simBoxConnectionAlive
});

export const setPartialCommonStore = (commonStorePartial) => ({
    type: SET_PARTIAL_COMMON_STORE_UPDATE,
    commonStorePartial
});
