import typeToReducer from 'type-to-reducer';
import { merge } from 'lodash';
import {
    SET_ACTIVE_SLOT,
    SET_COMMON_STORE,
    SET_PARTIAL_COMMON_STORE_UPDATE,
    SET_SIMBOX_CONNECTION_ALIVE
} from '../actions';

const initialState = {
    activeSlot: null,
    simBoxConnectionAlive: false,
    commonStore: {}
};

export const configReducer = typeToReducer(
    {
        [SET_ACTIVE_SLOT]: (state, { activeSlot }) => ({
            ...state,
            activeSlot
        }),
        [SET_COMMON_STORE]: (state, { commonStore }) => ({
            ...state,
            commonStore
        }),
        [SET_SIMBOX_CONNECTION_ALIVE]: (state, { simBoxConnectionAlive }) => ({
            ...state,
            simBoxConnectionAlive
        }),
        [SET_PARTIAL_COMMON_STORE_UPDATE]: (state, { commonStorePartial }) => ({
            ...state,
            commonStore: { ...merge(state.commonStore, commonStorePartial) }
        })
    },
    initialState
);
