import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";

const initialState = {
    referrals: null,
    loading: false,
    error: ""
};

export const fetchReferrals = createAsyncThunk(
    "referrals/fetch",
    async () => {
      return httpRequest(controllers.goal + "/referrals");
    }
  );

  const referralsSlice = createSlice({
    name: "referrals",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchReferrals.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.referrals = action.payload;
        state.error = "";
      });
      builder.addCase(fetchReferrals.rejected, (state, action) => {
        state.loading = false;
        state.referrals = {};
        state.error = "Error, Failed to load referrals";
      });
    },
  });

  export default referralsSlice.reducer;