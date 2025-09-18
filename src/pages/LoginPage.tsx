import React, { useEffect } from "react";
import AuthModal from "../components/auth/AuthModal";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const me = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (me?.authenticated) {
      navigate("/");
    }
  }, [me, navigate]);

  return (
    <div style={{ padding: 20 }}>
      <AuthModal open={true} />
    </div>
  );
};

export default LoginPage;
