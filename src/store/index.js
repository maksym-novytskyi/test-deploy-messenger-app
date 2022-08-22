import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import usersReducer from "../reducers/usersReducer";

const store = createStore( 
                combineReducers({usersReducer}),
                compose(applyMiddleware(ReduxThunk),
                        /*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/)
                );

export default store;
