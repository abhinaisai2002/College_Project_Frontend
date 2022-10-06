/// ACTION CREATORS

import axios from "axios"
import { toast } from "react-toastify"

import {authActions} from '../reducers/authSlice'
import { modalActions } from "../reducers/modalSlice"

export const loginAction = (user)=>{
    return async (dispatch)=>{
        const login = async () => {
            const response  = await axios.post(
                `http://localhost:8000/api/auth/login`,
                user,
                {
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            );
            const {data} = response;
            return data;
        }

        try{
            const data = await login();
            dispatch(authActions.login(data));
            toast.success("Login successfully");
        }
        catch(err){
            const {message} = err.response.data;
            dispatch(modalActions.showModal(message));
        }

    }
}

export const getNewTokens = (refreshToken)=>{
    return async (dispatch)=>{
        const token = {
            "refresh" : refreshToken
        }
        const getToken = async ()=>{
            const response = await axios.post(
                'http://localhost:8000/api/auth/o/token',
                token,
                {
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            )
            const {data} = response;
            return data;
        }

        try{
            const data = await getToken();
            dispatch(authActions.getNewToken(data));
        }
        catch(err){
            console.log(err);
        }
    }
}