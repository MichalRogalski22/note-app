import s from "./style.module.css";

import { ReactComponent as LogoSVG } from "assets/images/logo.svg";

const AuthLayout = ({ children }) => {
  const header = (
    <div className={s.header}>
      <LogoSVG className={s.logoTop} />
      <h3 className={s.logoTitle}>Notomatic</h3>
    </div>
  );

  const background = (
    <div className={s.background}>
      <div className="d-flex">
        <LogoSVG className={s.logo} />
        <h1 className={s.backgroundTitle}>Notomatic</h1>
      </div>
      <p className={s.backgroundLogoTitle}>One place for the team notes</p>
    </div>
  );

  return (
    <div className={s.root}>
      {header}
      <div className={s.leftSection}>{children}</div>
      <div className={`${s.rightSection} d-none d-lg-flex ,`}>{background}</div>
    </div>
  );
};

export default AuthLayout;
