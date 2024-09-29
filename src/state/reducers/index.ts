import { combineReducers } from "redux";
import ParentInformationReducer from "./ParentInformationReducers";

const reducers = combineReducers({
  parentInformation: ParentInformationReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
