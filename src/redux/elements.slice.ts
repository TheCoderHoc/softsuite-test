import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import ElementType from "../types/element";

interface ElementSliceState {
    error: string | undefined,
    message: string,
    fetching: boolean,
    elements: ElementType[],
}

const initialState:ElementSliceState = {
    error: "",
    message: "",
    fetching: false,
    elements: [],
}

const elementSlice = createSlice({
    name: "element",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // FETCH ELEMENTS PENDING
        builder.addCase(fetchElements.pending, (state,) => {
            state.fetching = true;
        })

        // FETCH ELEMENTS FULFILLED
        builder.addCase(fetchElements.fulfilled, (state, action) => {
            state.fetching = false;
            state.elements = action.payload.data.content;
        })

        // FETCH ELEMENTS FAILED
        builder.addCase(fetchElements.rejected, (state, action) => {
            state.error = action.error.message;
        })

        // ADD ELEMENT PENDING
        builder.addCase(addElement.pending, (state) => {
            state.fetching = true;
        })

        // ADD ELEMENT FULFILLED
        builder.addCase(addElement.fulfilled, (state) => {
            state.fetching = false;
        })

        // ADD ELEMENT FAILED
        builder.addCase(addElement.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        })

        // TRASH ELEMENT PENDING
        builder.addCase(trashElement.pending, (state) => {
            state.fetching = true;
        })

        // TRASH ELEMENT FULFILLED
        builder.addCase(trashElement.fulfilled, (state) => {
            state.fetching = false;
        })

        // TRASH ELEMENT FAILED
        builder.addCase(trashElement.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        })
    }
})

export const fetchElements = createAsyncThunk("elements/fetchElements", async() => {
    const response = await axiosInstance({
        method: "GET",
        url: "/elements"
    })

    return response.data
})

export const addElement = createAsyncThunk("elements/addElement", async(payload: any) => {    
    const response = await axiosInstance({
        method: "POST",
        url: "/elements",
        data: payload,
    })

    return response.data
})

export const trashElement = createAsyncThunk("elements/trashElement", async(elementId: string) => {
    
    const response = await axiosInstance({
        method: "DELETE",
        url: `/elements/${elementId}`,
    })

    return response.data
})

export default elementSlice.reducer;