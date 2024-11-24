import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice"
import feedReducer from "../utils/feedSlice"
import requestReducer from "../utils/requestSlice"

export const appStore = configureStore({
    reducer : {
        user:userReducer,
        feed : feedReducer,
        request : requestReducer}
})