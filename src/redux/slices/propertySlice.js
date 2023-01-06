import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";

const initialState = {
    property: null,
    loading: false,
    error: ""
};

export const fetchProperty = createAsyncThunk(
    "property/fetch",
    async (arg) => {
      console.log(arg);
      return httpRequest(controllers.property + `/${arg.id}`);
    }
  );

  const propertySlice = createSlice({
    name: "property",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchProperty.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
        state.error = "";
      });
      builder.addCase(fetchProperty.rejected, (state, action) => {
        state.loading = false;
        state.property = {};
        state.error = "Error, Failed to load property";
      });
    },
  });

  export default propertySlice.reducer;