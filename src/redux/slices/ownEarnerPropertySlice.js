import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";

const initialState = {
    ownEarnerProperties: null,
    loading: false,
    error: ""
};
 
export const fetchOwnEarnerProperties = createAsyncThunk(
    "ownearnerProperties/fetch",
    async () => {
      return httpRequest(controllers.property);
    }
  );


  const ownEarnerPropertySlice = createSlice({
    name: "ownEarnerProperties",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchOwnEarnerProperties.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchOwnEarnerProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.ownEarnerProperties = action.payload;
        state.error = "";
      });
      builder.addCase(fetchOwnEarnerProperties.rejected, (state, action) => {
        state.loading = false;
        state.ownEarnerProperties = {};
        state.error = "Error, Failed to load properties";
      });
    },
  });

  export default ownEarnerPropertySlice.reducer;