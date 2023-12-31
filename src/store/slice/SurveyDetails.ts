import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { MovieAPI } from '../../api/MovieAPI'

export interface State {
    searchString: string,
    details: {},
    loading: boolean,
    error: boolean,
    deleteQuestionId : string,
    dLoading:boolean,
    dError:boolean
    dDetails : {}
}

const initialState: State = {
    searchString: '',
    details: {},
    loading: false,
    error: false,
    deleteQuestionId : '',
    dLoading : false,
    dError : false,
    dDetails : {}
}

export const getSurveyDetails = createAsyncThunk('getSurveyDetails', async () => {
    const body = {
        surveyid : '0651893d-7bd6-431e-8a05-529d516826b4'
    }
    const response = await MovieAPI.post(`/getSurveyDetails`,body);
    if (response.data.error) {
        throw new Error("Error message");
    }
    return response.data;
})

export const deleteQuestion = createAsyncThunk('deleteQuestion', async (body:any) => {
    const params = {
        questionid : body
    }
    try {
        const response = await MovieAPI.post(`/deletequestion`,params);
        return response.data;
    } catch (error) {
        return error
    }
})

const SurveyDetailsSlice = createSlice({
    initialState,
    name: 'surveyDetails',
    reducers: {
        clearSurveyDetails: (state) => {
            return {...state, details : {}}
        },  
    },
    extraReducers: (builder) => {
        //surveydetails
        builder.addCase(getSurveyDetails.pending, (state, payload) => {
            // const search = payload.meta.arg.search;
            return { ...state, loading: true}
        })
        builder.addCase(getSurveyDetails.fulfilled, (state, { payload }) => {
            return { ...state, details: payload, error: false, loading: false }
        })
        builder.addCase(getSurveyDetails.rejected, (state) => {
            return { ...state, loading: false, error: true }
        })
        //deletequestion
        builder.addCase(deleteQuestion.pending, (state, payload) => {
            // const search = payload.meta.arg.search;
            return { ...state, dLoading: true}
        })
        builder.addCase(deleteQuestion.fulfilled, (state, { payload }) => {
            return { ...state, dDetails: payload, dError: false, dLoading: false }
        })
        builder.addCase(deleteQuestion.rejected, (state,payload) => {
            return { ...state, dLoading: false, dError: true,dDetails : payload }
        })
    }
})
export const { clearSurveyDetails } = SurveyDetailsSlice.actions;
export default SurveyDetailsSlice.reducer;