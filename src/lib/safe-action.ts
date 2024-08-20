import { AxiosError } from "axios";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
