import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const createEmployee = createAsyncThunk('employee/createEmployee', async (employee, { rejectWithValue }) => {
    try {
        console.log(employee);

        const docRef = await addDoc(collection(db, 'employees'), employee)
        console.log(docRef.id);

        return { ...employee, id: docRef.id }

    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

export const getAllEmployee = createAsyncThunk("employee/getAllEmployee", async (_, { rejectWithValue }) => {
    try {
        const querySnapshot = await getDocs(collection(db, "employees"));

        const employees = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(employees);

        return employees;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id, { rejectWithValue }) => {
    try {
        await deleteDoc(doc(db, "employees", id));
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
export const updateEmployee = createAsyncThunk("employee/updateEmployee", async ({ id, employee }, { rejectWithValue }) => {
    try {
        await updateDoc(doc(db, "employees", id), employee);

        return {
            id,
            ...employee,
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);
const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder

            // Create Employee
            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.push(action.payload);
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All Employees
            .addCase(getAllEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(getAllEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //delete Employee
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = state.employees.filter((emp) => emp.id !== action.payload);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Employee
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;

                state.employees = state.employees.map((emp) => {
                    if (emp.id === action.payload.id) {
                        return action.payload;
                    }

                    return emp;
                });
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});
export default employeeSlice.reducer