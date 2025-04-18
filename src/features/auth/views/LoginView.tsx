import React from "react";
import { observer } from "mobx-react-lite";
import LoginForm from "@/components/auth/LoginForm"; 

const LoginView: React.FC = observer(() => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <LoginForm />
    </div>
  );
});

export default LoginView;
