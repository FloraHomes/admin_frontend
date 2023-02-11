import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    editor: {},
}

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        saveEditor: (state, action) => {
            state.editor = action.payload
        },
    }
})

export default editorSlice.reducer
export const {saveEditor} = editorSlice.actions