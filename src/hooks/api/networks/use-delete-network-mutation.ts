import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosError, type AxiosResponse } from "axios";
import { axiosInstance } from "~/lib/axios";
import { type NetworkResponse } from "~/lib/validations/network";

interface DeleteNetworkMutationProps {
  id: string;
}

export function useDeleteNetworkMutation({ id }: DeleteNetworkMutationProps) {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<NetworkResponse>, AxiosError>({
    mutationKey: ["Networks", "Delete"],
    mutationFn: () => axiosInstance.delete(`/networks/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["Networks", "GetAll"],
      }),
  });
}
