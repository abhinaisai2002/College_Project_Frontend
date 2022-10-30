
import axios from "axios";

import { assignmentActions } from "../reducers/assignmentSlice";

export const loadAllAssignmentsAction = (token)=>{
    console.log(token)
    return async (dispatch)=>{
        async function getAssignment(){
            const response = await axios.get(
                'http://localhost:8000/api/students/assignments',
                {
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }
            );
            const {data} = response;
            return data;
        }

        try{
            const data = await getAssignment();
            dispatch(assignmentActions.loadAllAssignments(data));
        }
        catch(err){
            const {message} = err.response.data;
        }

    }
}

export const submitAssigment = (form_data,token)=>{
    return async (dispatch) => {
        async function send_assignment(){
            const response = await axios.post(
                'http://localhost:8000/api/students/upload',
                form_data,
                {
                    headers:{
                        'Authorization':`Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            const {data} = response;
            return data;
        }

        try{
            const data = await send_assignment();
            dispatch(assignmentActions.submitAssigment(data));
        }
        catch(err){
            const {message} = err.response.data;
        }
    }
}