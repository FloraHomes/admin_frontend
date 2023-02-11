import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    otherImages: [],
    otherPhotos: [],
    captionImage: "",
    coverImage: "",
    faq: []
}

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        updateOtherImages: (state, {payload}) => {
            state.otherImages = [...state.otherImages, payload]
        },

        updateCaptionImage: (state, {payload}) => {
            state.captionImage = payload
        },

        updateCoverImage: (state, {payload}) => {
            state.coverImage = payload
        },

        updateOtherPhotos: (state, {payload}) => {
            state.otherPhotos = [...state.otherPhotos, payload]
        },

        addFaq: (state, {payload}) => {
            state.faq = [...state.faq, payload]
        },

        updateFa: (state, {payload}) => {
            let upd_obj = state.faq.findIndex((obj => obj.uuid === payload.uuid));

            state.faq[upd_obj].question = payload.question
            state.faq[upd_obj].answer = payload.answer
        },

        removeFa: (state, {payload}) => {
            state.faq = state.faq.filter((fa) => fa.uuid !== payload)
        },

    }
})

export default fileSlice.reducer
export const {updateOtherImages, updateCaptionImage, updateCoverImage, addFaq, updateFa, removeFa, updateOtherPhotos} = fileSlice.actions