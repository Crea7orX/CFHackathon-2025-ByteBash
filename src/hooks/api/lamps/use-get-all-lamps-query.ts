import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { axiosInstance } from "~/lib/axios";
import { type LampsResponse } from "~/lib/validations/lamps";

export function useGetAllLampsQuery({
  ...options
}: Partial<UseQueryOptions<LampsResponse[], AxiosError>>) {
  return useQuery<LampsResponse[], AxiosError>({
    ...options,
    queryKey: ["LampsResponse", "GetAll"],
    queryFn: async () =>
      (await axiosInstance.get("/lamps")).data as LampsResponse[],
  });
}
