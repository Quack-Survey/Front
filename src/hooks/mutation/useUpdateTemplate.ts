import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFetch } from "@/utils/fetch/core";
import { deleteCookie } from "cookies-next";

const useUpdateTemplate = (url: string, id: string | string[]) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (templateData: any) => putFetch(url, JSON.stringify(templateData)),
    {
      onSuccess: (data) => {
        if (data.message === "No authentication.") {
          alert("로그인이 만료되었습니다.");
          deleteCookie("username");
          router.replace("/login");
        }

        queryClient.invalidateQueries([id]);
      },
    },
  );

  return { mutate };
};

export { useUpdateTemplate };
