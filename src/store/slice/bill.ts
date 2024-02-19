import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCall } from '../../api/api';
export interface State {
    body: any,
    loading: boolean,
    error: boolean,
}

const initialState = {
    body : [],
    loading : false,
    error : false
}

export const addBill = createAsyncThunk('addBill', async (body: any) => {
    const response = await apiCall.post(`/addBill`, body);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})

const billSlice = createSlice({
    initialState,
    name: 'addBill',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addBill.pending, (state, _payload) => {
            return { ...state, loading: true }
        })
        builder.addCase(addBill.fulfilled, (state, { payload }) => {
            return { ...state, body: payload, error: false, loading: false }
        })
        builder.addCase(addBill.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
    }
})
export default billSlice.reducer;