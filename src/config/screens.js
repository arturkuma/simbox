import Home from '../screens/Home';
import Autopilot from '../screens/Autopilot';
import Radio from '../screens/Radio';
import Lights from '../screens/Lights';

const screens = {
    Home: {
        displayName: 'Home',
        component: Home,
        route: ''
    },
    Autopilot: {
        displayName: 'Autopilot',
        component: Autopilot,
        route: 'autopilot'
    },
    Radio: {
        displayName: 'Radio',
        component: Radio,
        route: 'radio'
    },
    Lights: {
        displayName: 'Lights',
        component: Lights,
        route: 'lights'
    }
};

export default screens;
