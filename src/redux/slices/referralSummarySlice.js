import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";

const initialState = {
    referralSummary: null,
    loading: false,
    error: ""
};

export const fetchReferralSummary = createAsyncThunk(
    "referralSummary/fetch",
    async () => {
      return httpRequest(controllers.goal + "/summary");
    }
  );

  const referralSummarySlice = createSlice({
    name: "referralSummary",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchReferralSummary.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchReferralSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.referralSummary = action.payload;
        state.error = "";
      });
      builder.addCase(fetchReferralSummary.rejected, (state, action) => {
        state.loading = false;
        state.referralSummary = {};
        state.error = "Error, Failed to load referralSummary";
      });
    },
  });

  export default referralSummarySlice.reducer;