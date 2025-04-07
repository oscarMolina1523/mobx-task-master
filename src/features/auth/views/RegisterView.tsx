import RegisterForm from "@/components/auth/RegisterForm";
import { observer } from "mobx-react-lite";
import React from "react";

const RegisterView: React.FC = observer(() => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <RegisterForm />
    </div>
  );
});

export default RegisterView;
