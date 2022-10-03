/// ACTION CREATORS

import axios from "axios"

import {authActions} from '../reducers/authSlice'

export const signUpAction = (user)=>{
    return async (dispatch)=>{
        user = {...user,'user_type':user.accountType};
        const {accountType,...body} = user;
        const signup = async () => {
            const response  = await axios.post(
                `http://localhost:8000/api/auth/signup`,body,
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
            const data = await signup();
            dispatch(authActions.signup(data));
        }
        catch(err){
            console.log(err);
        }

    }
}