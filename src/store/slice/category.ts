import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCall } from '../../api/api';

export interface State {
    body: any,
    loading: boolean,
    error: boolean,
}

const initialState: State = {
    body: {},
    loading: false,
    error: false,
}

export const getCategory = createAsyncThunk('getCategory', async () => {
    const response = await apiCall.get(`/getCategory`);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})


const CategorySlice = createSlice({
    initialState,
    name: 'getCategory',
    reducers: {
        clearCategory: (state) => {
            return { ...state, body: {} }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCategory.pending, (state, _payload) => {
            return { ...state, loading: true }
        })
        builder.addCase(getCategory.fulfilled, (state, { payload }) => {
            return { ...state, body: payload, error: false, loading: false }
        })
        builder.addCase(getCategory.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
    }
})
export const { clearCategory } = CategorySlice.actions;
export default CategorySlice.reducer;