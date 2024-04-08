import { useEffect, useState } from "react";
import Form from "../components/Form";
import { SIGNUP, LOGIN } from "../constants/AppConstants";
import AuthDetails from "../libs/AuthDetails";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const { isAuthenticated } = AuthDetails();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const [formType, setFormType] = useState<string>(SIGNUP);

  return (
    <div>
      <button onClick={() => setFormType(SIGNUP)}>Register</button>
      <button onClick={() => setFormType(LOGIN)}>Login</button>
      <Form formType={formType} />
    </div>
  );
};

export default Auth;
