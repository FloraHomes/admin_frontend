import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";

const initialState = {
    payments: null,
    loading: false,
    error: ""
};

export const fetchCustomerPayments = createAsyncThunk(
    "payments/fetch",
    async () => {
      return httpRequest(controllers.payment + "/mine");
    }
  );

  const paymentSlice = createSlice({
    name: "payments",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchCustomerPayments.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchCustomerPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
        state.error = "";
      });
      builder.addCase(fetchCustomerPayments.rejected, (state, action) => {
        state.loading = false;
        state.payments = {};
        state.error = "Error, Failed to load payments";
      });
    },
  });

  export default paymentSlice.reducer;