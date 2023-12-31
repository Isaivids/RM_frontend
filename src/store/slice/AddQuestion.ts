import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { MovieAPI } from '../../api/MovieAPI'

export interface State {
    body: any,
    loading: boolean,
    error: boolean,
    questionBody : any,
    questionLoading : boolean,
    questionError : boolean,
    updateLoading : boolean,
    updateError : boolean
}

const initialState: State = {
    body: {},
    loading: false,
    error: false,
    questionBody : {},
    questionLoading : false,
    questionError : false,
    updateLoading : false,
    updateError : false
}

export const getQuestionDetails = createAsyncThunk('getQuestionDetails', async (body:any) => {
    const response = await MovieAPI.post(`/multiselect`,body);
    return response.data;
})

export const getMultiSelectQuestionWithId = createAsyncThunk('getMultiSelectQuestionWithId', async (body:any) => {
    const response = await MovieAPI.post(`/getMultiselectQuestion`,body);
    return response.data;
})

export const updateMultiSelectQuestionAndOptions = createAsyncThunk('updateQuestionAndOptions', async (body:any) => {
    const response = await MovieAPI.put(`/updateQuestionAndOptions`,body);
    return response.data;
})

const AddQuestionSlice = createSlice({
    initialState,
    name: 'addQuestion',
    reducers: {
        clearSurveyDetails: (state) => {
            return {...state, details : {}}
        },  
    },
    extraReducers: (builder) => {
        //surveydetails
        builder.addCase(getQuestionDetails.pending, (state, _payload) => {
            return { ...state, loading: true}
        })
        builder.addCase(getQuestionDetails.fulfilled, (state, { payload }) => {
            return { ...state, details: payload, error: false, loading: false }
        })
        builder.addCase(getQuestionDetails.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
        //getMultiSelectQuestionWithId
        builder.addCase(getMultiSelectQuestionWithId.pending, (state, _payload) => {            
            return { ...state, questionLoading: true}
        })
        builder.addCase(getMultiSelectQuestionWithId.fulfilled, (state, { payload }) => {
            return { ...state, questionBody: payload, error: false, questionLoading: false }
        })
        builder.addCase(getMultiSelectQuestionWithId.rejected, (state) => {
            return { ...state, questionLoading: false, questionError: true }
        })
        //updateQuestionAndOptions
        builder.addCase(updateMultiSelectQuestionAndOptions.pending, (state, _payload) => {            
            return { ...state, updateLoading: true}
        })
        builder.addCase(updateMultiSelectQuestionAndOptions.fulfilled, (state, { payload }) => {
            return { ...state, updateError: false, updateLoading: false }
        })
        builder.addCase(updateMultiSelectQuestionAndOptions.rejected, (state) => {
            return { ...state, updateLoading: false, updateError: true }
        })
    }
})
export const { clearSurveyDetails } = AddQuestionSlice.actions;
export default AddQuestionSlice.reducer;