"use client";

import React, { useState } from "react";
import Button from "../Button";
import styles from "./login.module.scss";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const inputUserEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const inputPassword = (event) => {
    setPassword(event.target.value);
  };
  const isEmailValid = userEmail.match(emailRegex) !== null;
  const isPasswordValid = password.length >= 5;

  const loginClick = () => {
    router.push("/");
  };

  const handleSignIn = () => {
    if (isEmailValid && isPasswordValid) {
      fetch("http://10.58.52.70:8000/users/signin", {
        method: "POST",
        headers: {},
      });
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.splash}>
        <img className={styles.logoImage} alt="main_logo" src="./logo.png" />
        <img
          className={styles.logoWecode}
          alt="logo_wecode"
          src="./LogoWecode.png"
        />
      </div>
      <div className={styles.container}>
        <input
          className={styles.userInput}
          placeholder="이메일"
          onChange={inputUserEmail}
        />
        <input
          className={styles.userInput}
          placeholder="비밀번호"
          type="password"
          onChange={inputPassword}
        />
        <Button
          onClick={loginClick}
          disabled={!isEmailValid || !isPasswordValid}
        >
          로그인
        </Button>
        <div className={styles.signUpfindPw}>
          <span
            className={styles.signUp}
            onClick={() => {
              router.push("/signup");
            }}
          >
            회원가입
          </span>
          <span className={styles.separator}>|</span>
          <span className={styles.findPw}>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
}
