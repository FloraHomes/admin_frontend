import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";

const initialState = {
    goal: null,
    loading: false,
    error: ""
};

export const fetchGoal = createAsyncThunk(
    "goal/fetch",
    async () => {
      return httpRequest(controllers.goal + "/mine");
    }
  );

  const goalSlice = createSlice({
    name: "goal",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchGoal.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.goal = action.payload;
        state.error = "";
      });
      builder.addCase(fetchGoal.rejected, (state, action) => {
        state.loading = false;
        state.goal = {};
        state.error = "Error, Failed to load goal";
      });
    },
  });

  export default goalSlice.reducer;