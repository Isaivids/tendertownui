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

export const getProducts = createAsyncThunk('getProducts', async (body:any) => {
    const response = await apiCall.get(`/getProducts?category=${body.category}`);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})


const ProductSlice = createSlice({
    initialState,
    name: 'getProducts',
    reducers: {
        clearProducts: (state) => {
            return { ...state, body: {} }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, _payload) => {
            return { ...state, loading: true }
        })
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            return { ...state, body: payload, error: false, loading: false }
        })
        builder.addCase(getProducts.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
    }
})
export const { clearProducts } = ProductSlice.actions;
export default ProductSlice.reducer;