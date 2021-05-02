import { combineReducers } from 'redux';

// import reducers
import pageReducer from './page';
import pagesReducer from './pages';
import tempReducer from './temp';
import conditionReducer from './conditions';
import reportsReducer from './reports';
import weatherReducer from './weather';
import loadingReducer from './loading';
import errorReducer from './errorMessage';
import preloadingReducer from './preload';

const reducers = combineReducers({
    page: pageReducer,
    temp: tempReducer,
    pages: pagesReducer,
    conditions: conditionReducer,
    reports: reportsReducer,
    single_weather: weatherReducer,
    loading: loadingReducer,
    errorMessage: errorReducer,
    preload: preloadingReducer,
});

export default reducers;