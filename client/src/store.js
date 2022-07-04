import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import employees from "./redux/reducers/employeeReducer";
import auth from "./redux/reducers/authReducer";
import movies from "./redux/reducers/movieReducer";
import members from "./redux/reducers/memberReducer";
import subscriptions from "./redux/reducers/subscriptionReducer";

const rootReducer = combineReducers({
  employees,
  auth,
  movies,
  members,
  subscriptions,
});

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
