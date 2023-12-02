import { deleteCookie } from "cookies-next";

const checkExpiration = (data: any, router: any) => {
  if (data.message === "No authentication.") {
    alert("로그인이 만료되었습니다.");
    deleteCookie("email");
    deleteCookie("username");
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
    router.replace("/login");
  }
};

export { checkExpiration };
