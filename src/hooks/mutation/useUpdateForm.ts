import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFetch } from "@/utils/fetch/core";

const useUpdateForm = (
  url: string,
  id: string | string[],
  keyName?: string,
) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (formData: any) => putFetch(url, JSON.stringify(formData)),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([id, keyName]);
      },
    },
  );

  return { mutate };
};

export { useUpdateForm };
