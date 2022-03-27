import { connect } from 'react-redux';
import { get } from 'lodash';
import { AIRBUS, BOEING } from '../enum/Template';
import { CONFIG_REDUCER } from '../store';
import aircraftConfig from '../config/aircraft/aircraft';
import Boeing from './AutopilotTemplates/Boeing';
import Airbus from './AutopilotTemplates/Airbus';

function Autopilot({ template }) {
    if (template === BOEING) {
        return <Boeing />;
    }

    if (template === AIRBUS) {
        return <Airbus />;
    }
}

Autopilot = connect(
    ({ [CONFIG_REDUCER]: { commonStore } }) => ({
        config: get(aircraftConfig, [get(commonStore, 'aircraftConfig'), 'autopilot']),
        template: get(aircraftConfig, [get(commonStore, 'aircraftConfig'), 'template', 'autopilot'])
    })
)(Autopilot);

export default Autopilot;
