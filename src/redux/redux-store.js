import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import weatherReducer  from "./weather-reducer";
import thunkMiddleware from 'redux-thunk'; 

let reducers = combineReducers({
    weather: weatherReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;