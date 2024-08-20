import { config } from "@/utils/config";
import axios, { AxiosInstance } from "axios";

const { baseUrl } = config;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});
