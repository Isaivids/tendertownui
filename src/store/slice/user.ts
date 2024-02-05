import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
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

const UserSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        clearUser: (state) => {
            return { ...state, body: {} }
        },
        addUser: (state, action: PayloadAction<string>) => {
            const user: any = action.payload;
            state.body.data = user
        },
    },
})
export const { clearUser,addUser } = UserSlice.actions;
export default UserSlice.reducer;