/// ACTION CREATORS

import axios from "axios"

import {authActions} from '../reducers/authSlice'

export const loginAction = (user)=>{
    return async (dispatch)=>{
        const login = async () => {
            // const response  = await axios.post(
            //     `http://${process.env.BACK_END_HOST}/login`,
            //     user,
            //     {
            //         headers:{
            //             'Content-Type':'application/json'
            //         }
            //     }
            // );
            // const {data} = response;
            return user;
        }

        try{
            const data = await login();
            dispatch(authActions.login(data));
        }
        catch(err){
            console.log(err);
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