import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    step: 1,
    properties: []
}

const ownEarnerSlice = createSlice({
    name: 'ownEarner',
    initialState,
    reducers: {
        next: (state) => {
            state.step = state.step + 1
        },
        back: (state) => {
            state.step = state.step - 1
        },
        reset: (state) => {
            state.step = 1
        },
        updateOwnEarnerProperties: (state, action) => {
            state.properties = action.payload
        }
    }
})

export default ownEarnerSlice.reducer
export const {next, back, reset, updateOwnEarnerProperties} = ownEarnerSlice.actions
