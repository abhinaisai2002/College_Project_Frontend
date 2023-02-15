import { createSlice } from "@reduxjs/toolkit";

export const templateSlice = createSlice({
    name: 'template',

    initialState: {},

    reducers: {
        setState: (state) => {
            return state;
        }
    }
});

export const {setState} = templateSlice.actions;

export const templateState = (state) => state.template;

export default templateSlice.reducer;

