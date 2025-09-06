import { useState } from "react";
import LoginConfig from "../components/LoginConfig";
import ConfigValues from "../components/ConfigValues";

export default function Configuraciones() {
  const [isSuccess, setIsSuccess] = useState(false);

  return <>{!isSuccess ? <LoginConfig setIsSuccess={setIsSuccess} /> : <ConfigValues />}</>;
}
