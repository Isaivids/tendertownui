import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiCall } from '../../api/api';
export interface State {
    body: any,
    total: number,
    loading: boolean,
    error: boolean,
    aLoading: boolean,
    aError: boolean
}

const initialState: State = {
    body: {},
    total: 0,
    loading: false,
    error: false,
    aLoading: false,
    aError: false
}

export const getCartItems = createAsyncThunk('getCartItems', async (body: any) => {
    const response = await apiCall.post(`/getCartItems`, body);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})

export const addToCart = createAsyncThunk('addToCart', async (body: any) => {
    const response = await apiCall.post(`/addTocart`, body);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})

export const updateCount = createAsyncThunk('updateCount', async (body: any) => {
    const response = await apiCall.post(`/updateCount`, body);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})

export const deleteOneCartItem = createAsyncThunk('deleteOneCartItem', async (body: any) => {
    const response = await apiCall.post(`/deleteOneCartItem`, body);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})

export const removeItem = createAsyncThunk('removeItem', async (body: any) => {
    const response = await apiCall.post(`/removeItem`, body);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})

const calculateTotal = (items: any[]): number => {
    return items.reduce((total, item) => total + item.price * item.count, 0);
};

const cartSlice = createSlice({
    initialState,
    name: 'getCartItems',
    reducers: {
        clearCart: (state) => {
            return { ...state, body: { data: [] }, total: 0 }
        },
        addToCartReducer: (state, action: PayloadAction<any>) => {
            const { productId } = action.payload;
            const existingItem = state.body.data.find((item: any) => item.productId === productId);

            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.body.data.push(action.payload);
            }
            state.total = calculateTotal(state.body.data);
        },
        changeCount: (state, action: PayloadAction<string>) => {
            const product: any = action.payload;
            const existingItem = state.body.data.find((item: any) => item.productId === product.productId);
            if (existingItem) {
                if (product.type === 'increase') {
                    existingItem.count += 1;
                } else if (product.type === 'decrease') {
                    if (existingItem.count < 2) {
                        state.body.data = state.body.data.filter((item: any) => item.productId !== product.productId);
                    } else {
                        existingItem.count -= 1;
                    }
                }
            }
            state.total = calculateTotal(state.body.data);
        },
        removeOneItem : (state, action:PayloadAction<string>) =>{
            const product: any = action.payload;
            state.body.data = state.body.data.filter((item: any) => item.productId !== product.productId);
            state.total = calculateTotal(state.body.data);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state, _payload) => {
            return { ...state, loading: true }
        })
        builder.addCase(getCartItems.fulfilled, (state, { payload }) => {
            return { ...state, body: payload, error: false, loading: false }
        })
        builder.addCase(getCartItems.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
        builder.addCase(addToCart.pending, (state) => {
            return { ...state, aLoading: true }
        })
        builder.addCase(addToCart.fulfilled, (state, { payload }) => {
            return { ...state, body: payload, error: false, aLoading: false }
        })
        builder.addCase(addToCart.rejected, (state) => {
            return { ...state, aLoading: false, aError: true }
        })
        builder.addCase(updateCount.pending, (state) => {
            return { ...state, aLoading: true }
        })
        builder.addCase(updateCount.fulfilled, (state, { payload }) => {
            return { ...state, body: payload, error: false, loading: false }
        })
        builder.addCase(updateCount.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
        builder.addCase(deleteOneCartItem.pending, (state) => {
            return { ...state, loading: true }
        })
        builder.addCase(deleteOneCartItem.fulfilled, (state, { payload }) => {
            return { ...state, body: payload, error: false, loading: false }
        })
        builder.addCase(deleteOneCartItem.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
        builder.addCase(removeItem.pending, (state) => {
            return { ...state, loading: true }
        })
        builder.addCase(removeItem.fulfilled, (state, { payload }) => {
            return { ...state, body: payload, error: false, loading: false }
        })
        builder.addCase(removeItem.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
    }
})
export const { clearCart, addToCartReducer, changeCount,removeOneItem } = cartSlice.actions;
export default cartSlice.reducer;