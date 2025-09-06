import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import papelesReducer from "./slices/papelesSlice";
import valorM2Reducer from "./slices/valorM2Slice";
import valorLineaSlice from "./slices/valorLineaSlice";

// Persist config para papeles
const persistConfigPapeles = {
  key: "papeles",
  storage,
};

// Persist config para valorPorM2
const persistConfigM2 = {
  key: "valorM2",
  storage,
};
// Persist config para valorPorLinea
const persistConfigLinea = {
  key: "valorLinea",
  storage,
};

const persistedPapeles = persistReducer(persistConfigPapeles, papelesReducer);
const persistedValorM2 = persistReducer(persistConfigM2, valorM2Reducer);
const persistedValorLinea = persistReducer(persistConfigLinea, valorLineaSlice);

export const store = configureStore({
  reducer: {
    papeles: persistedPapeles,
    valorM2: persistedValorM2,
    valorLinea: persistedValorLinea,
  },
});

export const persistor = persistStore(store);
