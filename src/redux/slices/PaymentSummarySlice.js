import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";

const initialState = {
    paymentSummary: null,
    loading: false,
    error: ""
};

export const fetchPaymentSummary = createAsyncThunk(
    "paymentSummary/fetch",
    async () => {
      return httpRequest(controllers.payment + "/summary");
    }
  );

  const paymentSummarySlice = createSlice({
    name: "paymentSummary",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchPaymentSummary.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchPaymentSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentSummary = action.payload;
        state.error = "";
      });
      builder.addCase(fetchPaymentSummary.rejected, (state, action) => {
        state.loading = false;
        state.paymentSummary = {};
        state.error = "Error, Failed to load paymentSummary";
      });
    },
  });

  export default paymentSummarySlice.reducer;