import {createSlice } from '@reduxjs/toolkit'
import { object } from 'prop-types'

const initialState = {
    user: {},
    photo: null,
    goal: {},
    payment: {},
    signature: null,
    property: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = {}
        },
        updateUser:(state, action) => {
            state.user = Object.assign(state.user, action.payload)
        },
        updatePhoto:(state, action) => {
            state.photo = action.payload
        },
        saveGoal: (state, action) => {
            state.goal = action.payload
        },
        saveProperty: (state, action) => {
            state.property = action.payload
        },
        saveSignature: (state, action) => {
            state.signature = action.payload
        }
    }
})

export default userSlice.reducer
export const {saveUser, removeUser, updatePhoto, updateUser, saveGoal, saveProperty, saveSignature} = userSlice.actions
