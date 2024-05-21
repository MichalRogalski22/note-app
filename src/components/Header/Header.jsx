import { Logo } from "components/Logo/Logo";
import s from "./style.module.css";
import logoSrc from "assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth/auth-selectors";
import { AuthAPI } from "api/auth";
import { setUser } from "store/auth/auth-slice";
import UserIconMenu from "components/UserIconMenu/UserIconMenu";

export function Header() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signout = () => {
    AuthAPI.signout();
    dispatch(setUser(null));
  };

  return (
    <div className={`row g-0 ${s.container}`}>
      <div className="col-8 col-sm-4">
        <Logo
          onClick={() => navigate("/")}
          title="Notomatic"
          subtitle={"Manage your notes"}
          image={logoSrc}
        />
      </div>
      <div className="col-4 col-sm-8 text-end">
        <UserIconMenu userEmail={user.email} signout={signout} />
      </div>
    </div>
  );
}
