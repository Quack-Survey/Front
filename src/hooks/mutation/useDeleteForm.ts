import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFetch } from "@/utils/fetch/core";

const useDeleteForm = (
  url: string,
  id: string | string[],
  keyName?: string,
) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((_id: string) => deleteFetch(url), {
    onSuccess: (data) => {
      queryClient.invalidateQueries([id, keyName]);
    },
  });

  return { mutate };
};

export { useDeleteForm };
