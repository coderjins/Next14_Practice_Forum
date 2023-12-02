import React from "react";
import styles from "./Button.module.scss";

const Button = ({ onClick, disabled, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className ? styles[className] : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
