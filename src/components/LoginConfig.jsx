import { Box, Card, TextField, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

// ✅ Esquema de validación con Yup
const validationSchema = Yup.object({
  usuario: Yup.string()
    .required("El usuario es obligatorio")
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(20, "El usuario no puede superar los 20 caracteres"),

  contrasena: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(30, "La contraseña no puede superar los 30 caracteres"),
});

// ✅ Función separada para manejar el submit

export default function LoginConfig({setIsSuccess}) {
  const { enqueueSnackbar } = useSnackbar();
  async function handleLoginSubmit(values, { resetForm }) {
    try {
      if (values.usuario === "admin" && values.contrasena === "fotocopiasdani") {
        enqueueSnackbar("Acceso exitoso 😋", { variant: "success" });
        setIsSuccess(true);
      } else {
        enqueueSnackbar("Usuario o contraseña incorrectos 🤬", {
          variant: "error",
        });
      }

      resetForm();
    } catch (error) {
      console.log("Error al enviar:", error);
    }
  }
  return (
    <Box>
      <Card sx={{ p: 3, mt: 2, maxWidth: 400, mx: "auto" }}>
        <Formik
          initialValues={{ usuario: "", contrasena: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLoginSubmit} // 👉 usamos la función separada
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <TextField
                label="Usuario"
                name="usuario"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.usuario}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.usuario && Boolean(errors.usuario)}
                helperText={touched.usuario && errors.usuario}
              />

              <TextField
                label="Contraseña"
                name="contrasena"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.contrasena}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.contrasena && Boolean(errors.contrasena)}
                helperText={touched.contrasena && errors.contrasena}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Iniciar sesión
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}
