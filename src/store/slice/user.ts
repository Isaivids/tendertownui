import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiCall } from '../../api/api';

export interface State {
    body: any,
    loading: boolean,
    error: boolean,
    selectedUser : any
}

const initialState: State = {
    body: {},
    loading: false,
    error: false,
    selectedUser : {}
}
export const getUsers = createAsyncThunk('getUsers', async () => {
    const response = await apiCall.get(`/getUsers`);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})

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
        setLoggedInUser: (state, action: PayloadAction<string>) => {
            const user: any = action.payload;
            state.selectedUser = user
        },
        clearSelectedUser: (state) => {
            state.selectedUser = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, _payload) => {
            return { ...state, loading: true }
        })
        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            return { ...state, body: payload, error: false, loading: false }
        })
        builder.addCase(getUsers.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
    }
})
export const { clearUser,addUser,setLoggedInUser,clearSelectedUser } = UserSlice.actions;
export default UserSlice.reducer;