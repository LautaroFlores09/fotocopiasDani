import { useState, useEffect } from "react";
import { Box, TextField, Autocomplete, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPapel } from "../redux/slices/papelesSlice";
import { setValorPorM2 } from "../redux/slices/valorM2Slice";
import { setValorLinea } from "../redux/slices/valorLineaSlice";
import { enqueueSnackbar } from "notistack";

export default function ConfigValues() {
  const tiposPapel = ["Ilustracion", "Obra"];
  const dispatch = useDispatch();

  const papeles = useSelector((state) => state.papeles.papeles); // array de papeles
  const valorM2Redux = useSelector((state) => state.valorM2.valorPorM2);
  const valorLineaRedux = useSelector((state) => state.valorLinea.valorLinea);
  console.log("valorLineaRedux", valorLineaRedux);
  

  // Estado local para inputs
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [valor, setValor] = useState("");
  const [valorPorM2, setValorPorM2Local] = useState("");
  const [valorPorLinea, setValorPorLineaLocal] = useState("");

  // Traer valores guardados en Redux al montar
  useEffect(() => {
    if (papeles.length && tipoSeleccionado) {
      const papelGuardado = papeles.find(p => p.tipoPapel === tipoSeleccionado);
      if (papelGuardado) setValor(papelGuardado.valor);
    }
    if (valorM2Redux) setValorPorM2Local(valorM2Redux);
    if (valorLineaRedux) setValorPorLineaLocal(valorLineaRedux);
  }, [papeles, valorM2Redux, tipoSeleccionado, valorLineaRedux]);

  // Cuando se selecciona un tipo de papel, prellenar el valor si existe
  useEffect(() => {
    if (tipoSeleccionado) {
      const papelGuardado = papeles.find(p => p.tipoPapel === tipoSeleccionado);
      setValor(papelGuardado ? papelGuardado.valor : "");
    } else {
      setValor("");
    }
  }, [tipoSeleccionado, papeles]);

  const handleGuardar = () => {
    if (tipoSeleccionado) {
      dispatch(setPapel({ tipoPapel: tipoSeleccionado, valor }));
    }
    dispatch(setValorPorM2(valorPorM2));
    dispatch(setValorLinea(valorPorLinea));
    enqueueSnackbar("Valores guardados correctamente ✅🤑", { variant: "success" });

  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", display: "flex", flexDirection: "column", gap: 3 }}>

      {/* Fila: Autocomplete + Valor del papel */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          <Autocomplete
            options={tiposPapel}
            value={tipoSeleccionado}
            onChange={(event, newValue) => setTipoSeleccionado(newValue)}
            renderInput={(params) => <TextField {...params} label="Tipo de papel" fullWidth />}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <TextField
            label="Valor del papel"
            variant="outlined"
            fullWidth
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            type="number"
          />
        </Box>
      </Box>

      {/* Fila: Valor por m² */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Valor por m² de tinta"
            variant="outlined"
            fullWidth
            value={valorPorM2}
            onChange={(e) => setValorPorM2Local(e.target.value)}
            type="number"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Valor por linea"
            variant="outlined"
            fullWidth
            value={valorPorLinea}
            onChange={(e) => setValorPorLineaLocal(e.target.value)}
            type="number"
          />
        </Box>
      </Box>

      {/* Botón Guardar */}
      <Button variant="contained" color="primary" onClick={handleGuardar}>
        Guardar
      </Button>
    </Box>
  );
}
