import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    author: IAuth | null
}

export interface IAuth {
    email: string;
    password: string
}

const initialState: IInitialState = {
    author: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthor: (state, action) => {
            state.author = action.payload
        }
    }
})

export const { setAuthor } = authSlice.actions

export default authSlice.reducer;