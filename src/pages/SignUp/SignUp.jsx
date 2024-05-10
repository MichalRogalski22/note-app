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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      try {
        const user = await AuthAPI.signup(email, password);
        dispatch(setUser(user));
        await toast(
          "success",
          "Successfully signed up, you are now logged in."
        );
        navigate("/");
      } catch (error) {
        console.log(error);
        toast("error", "Account with this email already exists.");
      }
    } else {
      toast("error", "Passwords do not match");
    }
  };

  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Sign up <br /> to access your team notes
      </h2>
      <form className={s.formGroup} onSubmit={submit}>
        <Input placeholder="Email" onTextChange={setEmail} />
        <Input
          placeholder="Password"
          type="password"
          onTextChange={setPassword}
        />
        <Input
          placeholder="Password (repeat)"
          type="password"
          onTextChange={setPassword2}
        />
        <ButtonPrimary type="submit" className={s.button}>
          Sign in!
        </ButtonPrimary>
        <span>
          Already have an account? <Link to="/signin">Signin</Link>
        </span>
      </form>
    </div>
  );

  return <AuthLayout>{form}</AuthLayout>;
};

export default SignUp;
