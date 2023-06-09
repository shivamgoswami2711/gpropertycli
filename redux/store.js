import { configureStore } from "@reduxjs/toolkit";
import {homeReducer} from "../redux/reducers/homeReducer"
import { postReducer } from "./reducers/postReducer";
import { buyReducer } from "./reducers/buyReducer";
import { propertiesReducer } from "./reducers/propertiesReducer";
import { userReducer } from "./reducers/userReducer";

const store = configureStore({
    reducer:{
        home:homeReducer,
        post:postReducer,
        buy:buyReducer,
        property:propertiesReducer,
        user:userReducer
    }
})

export default store;