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