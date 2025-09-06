import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function Calculator({ setSection }) {
  const papeles = useSelector((state) => state.papeles.papeles);
  const valorPorM2 = useSelector((state) => state.valorM2.valorPorM2);
  const valorLinea = useSelector((state) => state.valorLinea.valorLinea);

  const [openDialog, setOpenDialog] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [valorPapel, setValorPapel] = useState("");
  const [total, setTotal] = useState(0);
  const [valorPorM2Local, setValorPorM2Local] = useState(valorPorM2);

  useEffect(() => {
    if (!papeles.length || !valorPorM2 || !valorLinea) {
      setOpenDialog(true);
      setCanRender(false);
    } else {
      setValorPorM2Local(valorPorM2);
      setCanRender(true);
    }
  }, [papeles, valorPorM2, valorLinea]);

  const validationSchema = Yup.object().shape({
    alto: Yup.number()
      .typeError("Debe ser un número")
      .positive("Mayor a 0")
      .required("Requerido"),
    largo: Yup.number()
      .typeError("Debe ser un número")
      .positive("Mayor a 0")
      .required("Requerido"),
    papel: Yup.string().required("Seleccione un papel"),
    tinta: Yup.number()
      .typeError("Debe ser un número")
      .min(0, "Mínimo 0%")
      .max(110, "Máximo 110%")
      .required("Requerido"),
  });

  const calcularTotal = (values) => {
    const { alto, largo, tinta } = values;

    // Convertimos a número una sola vez
    const altoNum = Number(alto) || 0;
    const largoNum = Number(largo) || 0;
    const tintaNum = Number(tinta) || 0;

    // Constantes claras
    const CM2_POR_M2 = 10000;
    const papelM2 = Number(valorPapel) || 0;
    const valorLineaNum = Number(valorLinea) || 0;
    const valorPorM2Num = Number(valorPorM2) || 0;

    // Superficie total
    const supEnCM2 = altoNum * largoNum;

    // Cálculo de tinta
    const esLinea = tintaNum === 0;
    const porcentajeTinta = esLinea ? 1 : tintaNum / 100;
    const tintaM2 = esLinea ? valorLineaNum : valorPorM2Num;

    // Costos
    const costoPapel = (supEnCM2 * papelM2) / CM2_POR_M2;
    const costoTinta = (supEnCM2 * tintaM2 * porcentajeTinta) / CM2_POR_M2;

    setTotal(costoPapel + costoTinta);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={() => {}} disableEscapeKeyDown>
        <DialogTitle>Falta información</DialogTitle>
        <DialogContent>
          Algunos datos necesarios no están cargados en la configuración.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSection("configuraciones")}
            variant="contained"
            color="secondary"
          >
            Ir a Configuraciones
          </Button>
        </DialogActions>
      </Dialog>

      {canRender && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Container
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              boxShadow: 5,
              maxWidth: 500,
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
              Ploteos
            </Typography>

            <Formik
              initialValues={{ alto: "", largo: "", papel: "", tinta: "100" }}
              validationSchema={validationSchema}
              onSubmit={(values) => calcularTotal(values)}
            >
              {({ values, errors, touched, handleChange, setFieldValue }) => (
                <Form>
                  {/* Alto y Largo */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <TextField
                      label="Alto"
                      name="alto"
                      type="number"
                      value={values.alto}
                      onChange={handleChange}
                      error={touched.alto && Boolean(errors.alto)}
                      helperText={touched.alto && errors.alto}
                      fullWidth
                    />
                    <TextField
                      label="Largo"
                      name="largo"
                      type="number"
                      value={values.largo}
                      onChange={handleChange}
                      error={touched.largo && Boolean(errors.largo)}
                      helperText={touched.largo && errors.largo}
                      fullWidth
                    />
                  </Box>

                  {/* Papel y valor */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <TextField
                      select
                      label="Papel"
                      name="papel"
                      value={values.papel}
                      onChange={(e) => {
                        handleChange(e);
                        const p = papeles.find(
                          (p) => p.tipoPapel === e.target.value
                        );
                        setValorPapel(p ? p.valor : 0);
                      }}
                      error={touched.papel && Boolean(errors.papel)}
                      helperText={touched.papel && errors.papel}
                      fullWidth
                    >
                      {papeles.map((p) => (
                        <MenuItem key={p.tipoPapel} value={p.tipoPapel}>
                          {p.tipoPapel}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="$"
                      value={valorPapel}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </Box>

                  {/* Tinta */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <TextField
                      label="Tinta %"
                      name="tinta"
                      type="number"
                      value={values.tinta}
                      onChange={(e) => {
                        setFieldValue("tinta", e.target.value);
                        setValorPorM2Local(
                          Number(e.target.value) === 0
                            ? valorLinea
                            : (valorPorM2 * Number(e.target.value)) / 100
                        );
                      }}
                      error={touched.tinta && Boolean(errors.tinta)}
                      helperText={touched.tinta && errors.tinta}
                      fullWidth
                    />
                    <TextField
                      label="$"
                      value={valorPorM2Local}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </Box>

                  {/* Total */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "center",
                      gap: 2,
                      mb: 4,
                    }}
                  >
                    <Typography variant="h6" sx={{ minWidth: { sm: 100 } }}>
                      TOTAL
                    </Typography>
                    <TextField
                      value={total}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" type="submit" sx={{ px: 6 }}>
                      Calcular
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Box>
      )}
    </>
  );
}
