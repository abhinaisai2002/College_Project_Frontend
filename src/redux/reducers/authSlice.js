import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState : {
        access:null,
        refresh:null,
        user:null,
        isAuthenticated:false
    },
    reducers:{
        signup(state,data){
            localStorage.setItem('access',data.payload.access);
            localStorage.setItem('refresh',data.payload.refresh);
            localStorage.setItem('user',JSON.stringify(data.payload.user));
            state.access = data.payload.access;
            state.refresh = data.payload.refresh;
            state.isAuthenticated = true;
            state.user = data.payload.user;
        },
        loginDataFromLocal(state,data){
            state.access = data.payload.access;
            state.refresh = data.payload.refresh;
            state.isAuthenticated = true;
            state.user = data.payload.user;
        }
        ,
        login(state,data){
            localStorage.setItem('access',data.payload.access);
            localStorage.setItem('refresh',data.payload.refresh);
            localStorage.setItem('user',JSON.stringify(data.payload.user));
            state.access = data.payload.access;
            state.refresh = data.payload.refresh;
            state.isAuthenticated = true;
            state.user = data.payload.user;
            console.log(data.payload);
        },
        logout(state){
            localStorage.removeItem('accesss');
            localStorage.removeItem('refresh');
            localStorage.removeItem('user');
            
            state.isAuthenticated = false;
            state.access = null;
            state.refresh = null;
            state.user = null;
        },

    }
})




export const authActions = authSlice.actions;

export default authSlice;