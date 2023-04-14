import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const login = createAsyncThunk("auth/login", async(uname, pass)=>{
    const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({username: uname, password: pass})
    })
    const data = await res.json()
    return data
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: false,
        log: false
    },
    reducers: {
        reset(state) {
            state.user = false
            state.log = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.log = true
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer