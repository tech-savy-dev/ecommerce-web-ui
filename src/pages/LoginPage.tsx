import React from "react";
import AuthModal from "../components/auth/AuthModal";

const LoginPage: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <AuthModal open={true} />
    </div>
  );
};

export default LoginPage;
