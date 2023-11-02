import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import {
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";
import { postFetch } from "./fetch/core";
import { setCookie } from "cookies-next";

interface ICehckErros {
  (message: string, setError: UseFormSetError<FieldValues>): void;
}

interface IHandleUserAction {
  (
    data: FieldValues,
    router: AppRouterInstance,
    setError: UseFormSetError<FieldValues>,
  ): Promise<any>;
}

interface IValidateData {
  (
    data: string,
    setError: UseFormSetError<FieldValues>,
    clearErrors: UseFormClearErrors<FieldValues>,
  ): void;
}

interface ICheckPassword {
  (
    password: string,
    rePassword: string,
    setError: UseFormSetError<FieldValues>,
    clearErrors: UseFormClearErrors<FieldValues>,
  ): void;
}

interface ICheckEmptyObject {
  (data: object): boolean;
}

const checkErros: ICehckErros = (message, setError) => {
  switch (message) {
    case "Email does not match.":
      setError(
        "email",
        { message: "이메일을 확인해 주세요." },
        { shouldFocus: true },
      );
      break;
    case "Email already exists.":
      setError(
        "email",
        { message: "이미 가입된 아이디입니다." },
        { shouldFocus: true },
      );
      break;
    case "Password does not match.":
      setError(
        "password",
        { message: "비밀번호를 확인해 주세요." },
        { shouldFocus: true },
      );
      break;
  }
};

const handleSignup: IHandleUserAction = async (data, router, setError) => {
  const res = await postFetch("/users/signup", JSON.stringify(data));

  if (res.state) router.replace(`/verify?email=${data.email}`);
  else checkErros(res.message, setError);
};

const handleLogin: IHandleUserAction = async (data, router, setError) => {
  const res = await postFetch("/users/login", JSON.stringify(data));

  if (res.state) {
    setCookie("username", res.data.username);
    router.replace("/");
  } else if (res.message === "Email not verified.") {
    router.replace(`/verify?email=${data.email}`);
  } else {
    checkErros(res.message, setError);
  }
};

const validateEmail: IValidateData = (email, setError, clearErrors) => {
  const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

  if (!email) setError("email", { message: "이메일은 필수 입력입니다." });
  else if (!regex.test(email))
    setError("email", { message: "이메일 형식을 확인해 주세요." });
  else clearErrors("email");
};

const validatePassword: IValidateData = (password, setError, clearErrors) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i;

  if (!password)
    setError("password", { message: "비밀번호는 필수 입력입니다." });
  else if (!regex.test(password))
    setError("password", {
      message: "비밀번호는 8~16글자 사이의 문자, 숫자, 특수 문자 조합입니다.",
    });
  else clearErrors("password");
};

const checkPassword: ICheckPassword = (
  password,
  rePassword,
  setError,
  clearErrors,
) => {
  if (!rePassword)
    setError("rePassword", { message: "비밀번호 확인은 필수입니다." });
  else if (password !== rePassword)
    setError("rePassword", {
      message: "비밀번호가 일치하지 않습니다.",
    });
  else clearErrors("rePassword");
};

const checkEmptyObject: ICheckEmptyObject = (data) => {
  return Object.keys(data).length === 0;
};

export {
  handleSignup,
  handleLogin,
  validateEmail,
  validatePassword,
  checkPassword,
  checkEmptyObject,
};
