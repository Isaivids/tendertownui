import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from './slice/category'
import ProductSlice from './slice/products'
export const Store = configureStore({
    reducer : {categoryDetals: CategorySlice, productDetaild : ProductSlice}
})

export type AppDispatch = typeof Store.dispatch