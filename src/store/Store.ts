import { configureStore } from "@reduxjs/toolkit";
import SurveyDetailsSlice from './slice/SurveyDetails';
import AddQuestion from "./slice/AddQuestion";

export const Store = configureStore({
    reducer : {surveyDetails: SurveyDetailsSlice, addedQuestion : AddQuestion}
})

export type AppDispatch = typeof Store.dispatch