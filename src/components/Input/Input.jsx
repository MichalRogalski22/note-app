import s from "./style.module.css";

const Input = ({ onTextChange, placeholder, type, hasIcon }) => {
  return (
    <input
      type={type || "text"}
      className={`${s.input} ${hasIcon && s.withIcon}`}
      onChange={(e) => onTextChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
