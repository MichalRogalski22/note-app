import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";

import s from "./style.module.css";
import Input from "components/Input/Input";
import AuthLayout from "layouts/AuthLayout";
import { useState } from "react";
import { AuthAPI } from "api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "store/auth/auth-slice";
import { toast } from "utils/sweet-alert";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthAPI.signin(email, password);
      dispatch(setUser(user));
      await toast("success", "Successfully signed in");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast("error", "Invalid email or password");
    }
  };

  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Sign in <br /> to access your team notes
      </h2>
      <form className={s.formGroup} onSubmit={submit}>
        <Input placeholder="email" onTextChange={setEmail} />
        <Input
          placeholder="password"
          type="password"
          onTextChange={setPassword}
        />
        <ButtonPrimary type="submit" className={s.button}>
          Sign in!
        </ButtonPrimary>
        <span>
          Don't have an account yet? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );

  return <AuthLayout>{form}</AuthLayout>;
};

export default SignIn;
