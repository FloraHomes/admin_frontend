import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";

const initialState = {
    withdrawals: null,
    loading: false,
    error: ""
};

export const fetchWithdrawals = createAsyncThunk(
    "withdrawals/fetch",
    async () => {
      return httpRequest(controllers.withdrawal + "/mine");
    }
  );

  const withdrawalsSlice = createSlice({
    name: "withdrawals",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchWithdrawals.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchWithdrawals.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawals = action.payload;
        state.error = "";
      });
      builder.addCase(fetchWithdrawals.rejected, (state, action) => {
        state.loading = false;
        state.withdrawals = {};
        state.error = "Error, Failed to load withdrawals";
      });
    },
  });

  export default withdrawalsSlice.reducer;