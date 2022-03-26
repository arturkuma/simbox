import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { configReducer } from './reducer/config';

export const CONFIG_REDUCER = 'configReducer';

export default createStore(
    combineReducers({
        [CONFIG_REDUCER]: configReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);
