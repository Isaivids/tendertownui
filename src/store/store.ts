import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from './slice/category'
import ProductSlice from './slice/products'
import cartSlice from './slice/cart'
export const Store = configureStore({
    reducer : {categoryDetals: CategorySlice, productDetaild : ProductSlice, cartDetails : cartSlice}
})

export type AppDispatch = typeof Store.dispatch