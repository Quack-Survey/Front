import { getFetch } from "@/utils/fetch/core";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useEffect } from "react";

const useCheckAuth = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getFetch("/users");

      if (!data.state) {
        deleteCookie("email");
        deleteCookie("username");
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
        router.replace("/login");
      }
    })();
  }, [router]);
};

export default useCheckAuth;
