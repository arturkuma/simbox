import typeToReducer from 'type-to-reducer';
import { merge } from 'lodash';
import {
    SET_AIRCRAFT_CONFIGS,
    SET_COMMON_STORE,
    SET_PARTIAL_COMMON_STORE_UPDATE,
    SET_SIMBOX_CONNECTION_ALIVE
} from '../actions';

const initialState = {
    simBoxConnectionAlive: false,
    commonStore: {},
    aircraftConfigs: {}
};

export const configReducer = typeToReducer(
    {
        [SET_COMMON_STORE]: (state, { commonStore }) => ({
            ...state,
            commonStore
        }),
        [SET_AIRCRAFT_CONFIGS]: (state, { aircraftConfigs }) => {
            console.log(aircraftConfigs);

            return {
                ...state,
                aircraftConfigs
            };
        },
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
