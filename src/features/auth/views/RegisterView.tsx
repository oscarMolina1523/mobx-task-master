
import React from "react";
import { observer } from "mobx-react-lite";
import RegisterForm from "@/components/auth/RegisterForm"; // Mantiene la ruta original por ser de solo lectura

const RegisterView: React.FC = observer(() => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <RegisterForm />
    </div>
  );
});

export default RegisterView;
