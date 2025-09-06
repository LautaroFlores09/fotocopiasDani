import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  papeles: [] // array de { tipoPapel, valor }
};

const papelesSlice = createSlice({
  name: "papeles",
  initialState,
  reducers: {
    setPapel: (state, action) => {
      const { tipoPapel, valor } = action.payload;
      const index = state.papeles.findIndex(p => p.tipoPapel === tipoPapel);
      if (index !== -1) {
        state.papeles[index] = { tipoPapel, valor };
      } else {
        state.papeles.push({ tipoPapel, valor });
      }
    },
    removePapel: (state, action) => {
      state.papeles = state.papeles.filter(p => p.tipoPapel !== action.payload);
    },
  },
});

export const { setPapel, removePapel } = papelesSlice.actions;
export default papelesSlice.reducer;
