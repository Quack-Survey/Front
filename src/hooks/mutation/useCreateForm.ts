import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFetch } from "@/utils/fetch/core";

const useCreateForm = (
  url: string,
  id: string | string[],
  keyName?: string,
) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (formData: any) => postFetch(url, JSON.stringify(formData)),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([id, keyName]);
      },
    },
  );

  return { mutate };
};

export { useCreateForm };
