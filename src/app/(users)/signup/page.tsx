"use client";
import Button from "@/components/users/Button";
import LinkInfo from "@/components/users/LinkInfo";
import UserDataInput from "@/components/users/UserDataInput";
import { postFetch } from "@/utils/fetch/core";
import React from "react";
import { useForm } from "react-hook-form";

const Signup = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(async (data) =>
          postFetch("/users/signup", JSON.stringify(data)),
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
        <UserDataInput
          {...register("rePassword", {
            required: true,
          })}
          isError={!!errors.rePassword}
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요."
        />
        <UserDataInput
          {...register("username", {
            required: false,
          })}
          isError={!!errors.username}
          type="text"
          placeholder="(선택사항) 닉네임을 입력해 주세요."
        />
        <LinkInfo />
        <Button disabled={isSubmitting}>회원가입</Button>
      </form>
    </div>
  );
};

export default Signup;
