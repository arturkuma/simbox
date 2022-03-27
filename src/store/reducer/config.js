import typeToReducer from 'type-to-reducer';
import { merge } from 'lodash';
import {
    SET_COMMON_STORE,
    SET_PARTIAL_COMMON_STORE_UPDATE,
    SET_SIMBOX_CONNECTION_ALIVE
} from '../actions';

const initialState = {
    simBoxConnectionAlive: false,
    commonStore: {}
};

export const configReducer = typeToReducer(
    {
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
