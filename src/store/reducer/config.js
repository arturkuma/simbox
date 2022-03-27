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
    commonStore: {
        MSFS2020: true,
        aircraftConfig: 'ZIBO_B737_XPLANE11',
        refs: {
            'laminar/B738/autopilot/cmd_a_status': 1,
            'laminar/autopilot/ap_vvi_dial': 0,
            'laminar/B738/autopilot/vnav_engaged': 1,
            'laminar/B738/autopilot/lnav_status': 1,
            'laminar/B738/autopilot/mcp_speed_dial_kts_mach': 280,
            'laminar/B738/autopilot/course_pilot': 10,
            'laminar/B738/autopilot/mcp_hdg_dial': 10,
            'laminar/B738/autopilot/mcp_alt_dial': 34000,
            'sim/cockpit2/radios/actuators/com1_frequency_hz_833': '188304',
            'sim/cockpit2/radios/actuators/com1_standby_frequency_hz_833': '110305',
            'laminar/B738/fms/flight09': 'EPWA - EPKK',
            'laminar/B738/fms/lnav_dist_next': '119.875',
            'laminar/B738/fms/fpln_nav_id': 'OFFUK',
            'laminar/B738/fms/legs': 'EPWA WA865 WA975 SORIX NAVUR KK875 KK982 OFFUK EPKK'
        },
        simVars: {
            'L:A32NX_AUTOPILOT_SPEED_SELECTED': '-1',
            'L:A32NX_AUTOPILOT_HEADING_SELECTED': -1,
            'L:A32NX_AUTOPILOT_1_ACTIVE': 1,
            'L:A32NX_FCU_HDG_MANAGED_DOT': true,
            'L:A32NX_AUTOTHRUST_STATUS': 1,
            'L:A32NX_FCU_VS_MANAGED': 1,
            'AUTOPILOT ALTITUDE LOCK VAR:3': 28000
        }
    }
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
