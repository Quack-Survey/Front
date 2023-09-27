"use client";
import Button from "@/components/users/Button";
import LinkInfo from "@/components/users/LinkInfo";
import UserDataInput from "@/components/users/UserDataInput";
import { postFetch } from "@/utils/fetch/core";
import React from "react";
import { useForm } from "react-hook-form";

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(async (data) =>
          postFetch("/users/login", JSON.stringify(data)),
        )}
      >
        <UserDataInput
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
          })}
          isError={!!errors.email}
          type="email"
          placeholder="이메일을 입력해 주세요."
        />
        <UserDataInput
          {...register("password", {
            required: true,
          })}
          isError={!!errors.password}
          type="password"
          placeholder="비밀번호를 입력해 주세요."
        />
        <LinkInfo isLogin={true} />
        <Button disabled={isSubmitting}>로그인</Button>
      </form>
    </div>
  );
};

export default Login;
