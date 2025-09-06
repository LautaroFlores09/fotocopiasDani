import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valorPorM2: "" // valor independiente
};

const valorM2Slice = createSlice({
  name: "valorM2",
  initialState,
  reducers: {
    setValorPorM2: (state, action) => {
      state.valorPorM2 = action.payload;
    },
  },
});

export const { setValorPorM2 } = valorM2Slice.actions;
export default valorM2Slice.reducer;
