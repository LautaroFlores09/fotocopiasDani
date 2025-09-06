// utils/format.js
export const fCurrency = (number, currency = "ARS") => {
  if (number == null || isNaN(number)) return "0";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(number);
};
