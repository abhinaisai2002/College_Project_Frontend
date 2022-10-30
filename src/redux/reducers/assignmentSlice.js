import {createSlice} from '@reduxjs/toolkit';

const assignments = createSlice({
    name:'studentAssignments',
    initialState: {
        pending:[],
        submitted:[],
        reviewed:[]
    },
    reducers:{
        loadAllAssignments : (state,data)=>{
            const assignments = data.payload.assignments;
            let pending=[];
            let submitted=[];
            let reviewed=[];
            assignments.forEach((assignment) => {
                if(assignment.reviewed){
                    reviewed.push(assignment);
                }
                else if(assignment.submitted){
                    submitted.push(assignment);
                }
                else{
                    pending.push(assignment);
                }
            })
            state.pending = pending;
            state.submitted = submitted;
            state.reviewed = reviewed;
        },
        submitAssigment : (state,data) => {
            const {assignment} = data.payload;
            let pending = state.pending.filter(
                id => assignment.id
            )
            let submitted = [...state.submitted];
            submitted.push(assignment);
            let reviewed = [...state.reviewed];
            state.pending = pending;
            state.submitted = submitted;
            state.reviewed = reviewed;
        }
    }
})

export default assignments;

export const assignmentActions = assignments.actions;