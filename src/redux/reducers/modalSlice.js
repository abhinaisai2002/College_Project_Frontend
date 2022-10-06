import {createSlice} from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name:'modal',
    initialState:{
        showModal:false,
        modalMessage:"",
    },
    reducers:{
        showModal(state,message){
            state.showModal = true;
            state.modalMessage = message.payload;
        },
        closeModal(state){
            state.showModal = false;
            state.modalMessage = "";
        }
    }
})

export const modalActions = modalSlice.actions;

export default modalSlice;