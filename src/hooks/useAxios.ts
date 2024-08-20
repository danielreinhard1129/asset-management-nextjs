"use client";

import { axiosInstance } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { getSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const useAxios = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      async (config) => {
        const session = await getSession();
        const token = session?.user?.accessToken;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (
          err?.response?.status === 401 &&
          (err.response.data.message === "Token expired" ||
            err.response.data.message === "Token is missing" ||
            err.response.data.message === "Invalid token")
        ) {
          await signOut();
          queryClient.removeQueries();
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [queryClient, signOut]);

  return { axiosInstance };
};

export default useAxios;
