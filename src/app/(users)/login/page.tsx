"use client";
import React from "react";
import {
  Button,
  LoginForm,
  UserDataInput,
  ErrorMessage,
  LinkInfo,
} from "@/components/users";
import {
  checkEmptyObject,
  handleLogin,
  validateEmail,
  validatePassword,
} from "@/utils/userUtils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors, isValid },
  } = useForm();
  const router: AppRouterInstance = useRouter();

  return (
    <LoginForm>
      <form
        onSubmit={handleSubmit((data) => handleLogin(data, router, setError))}
      >
        <UserDataInput
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            onChange: (data) => {
              validateEmail(data.target.value, setError, clearErrors);
            },
          })}
          isError={!!errors.email}
          type="email"
          placeholder="이메일을 입력해 주세요."
        />
        <ErrorMessage>{errors.email?.message?.toString()}</ErrorMessage>
        <UserDataInput
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            onChange: (data) => {
              validatePassword(data.target.value, setError, clearErrors);
            },
          })}
          isError={!!errors.password}
          type="password"
          placeholder="비밀번호를 입력해 주세요."
        />
        <ErrorMessage>{errors.password?.message?.toString()}</ErrorMessage>
        <LinkInfo isLogin={true} />
        <Button
          disabled={!isValid || isSubmitting || !checkEmptyObject(errors)}
        >
          로그인
        </Button>
      </form>
    </LoginForm>
  );
};

export default Login;
