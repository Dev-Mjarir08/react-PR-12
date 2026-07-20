import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from '../employee/employeeSlice.js'
const store =configureStore({
    reducer:{
        employee:employeeReducer
    }
})
export default store