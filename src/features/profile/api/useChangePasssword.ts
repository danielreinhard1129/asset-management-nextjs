"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ChangePasswordArgs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const useChangePassword = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: ChangePasswordArgs) => {
      const { data } = await axiosInstance.patch<{ message: string }>(
        "/auth/change-password",
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Change password success");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useChangePassword;
