import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFetch } from "@/utils/fetch/core";

const useUpdateTemplate = (url: string, id: string | string[]) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (templateData: any) => putFetch(url, JSON.stringify(templateData)),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([id]);
      },
    },
  );

  return { mutate };
};

export { useUpdateTemplate };
