"use client";
import Button from "@/components/users/Button";
import LinkInfo from "@/components/users/LinkInfo";
import UserDataInput from "@/components/users/UserDataInput";
import React, { useState } from "react";

const Login = (): JSX.Element => {
  const [userData, setUserData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    switch (target.name) {
      case "email":
        setUserData((prev) => {
          return {
            ...prev,
            email: target.value,
          };
        });
        break;
      case "password":
        setUserData((prev) => {
          return {
            ...prev,
            password: target.value,
          };
        });
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await (
        await fetch("http://localhost:9999/api/users/login", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userData),
          credentials: "include",
        })
      ).json();

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <UserDataInput
        name="email"
        type="email"
        value={userData.email}
        onChange={handleInput}
        placeholder="이메일을 입력해 주세요."
      />
      <UserDataInput
        name="password"
        type="password"
        value={userData.password}
        onChange={handleInput}
        placeholder="비밀번호를 입력해 주세요."
      />
      <LinkInfo isLogin={true} />
      <Button onClick={handleSubmit}>로그인</Button>
    </div>
  );
};

export default Login;
