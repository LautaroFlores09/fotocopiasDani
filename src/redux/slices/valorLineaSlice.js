import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valorLinea: "" // valor independiente
};

const valorLineaSlice = createSlice({
  name: "valorLinea",
  initialState,
  reducers: {
    setValorLinea: (state, action) => {
      state.valorLinea = action.payload;
    },
  },
});

export const { setValorLinea } = valorLineaSlice.actions;
export default valorLineaSlice.reducer;
