import { connect } from 'react-redux';
import { get } from 'lodash';
import { CONFIG_REDUCER } from '../store';
import { AIRBUS, BOEING } from '../enum/Template';
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
    ({ [CONFIG_REDUCER]: { commonStore, aircraftConfigs } }) => ({
        template: get(aircraftConfigs, [get(commonStore, 'aircraftConfig'), 'template', 'radios'])
    })
)(Lights);

export default Lights;
