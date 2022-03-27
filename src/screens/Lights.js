import { connect } from 'react-redux';
import { get } from 'lodash';
import { CONFIG_REDUCER } from '../store';
import { AIRBUS, BOEING } from '../enum/Template';
import aircraftConfig from '../config/aircraft/aircraft';
import Boeing from './LightsTemplates/Boeing';
import Airbus from './LightsTemplates/Airbus';

function Lights({ template }) {
    if (template === BOEING) {
        return <Boeing />;
    }

    if (template === AIRBUS) {
        return <Airbus />;
    }
}

Lights = connect(
    ({ [CONFIG_REDUCER]: { commonStore } }) => ({
        template: get(aircraftConfig, [get(commonStore, 'aircraftConfig'), 'template', 'radios'])
    })
)(Lights);

export default Lights;
