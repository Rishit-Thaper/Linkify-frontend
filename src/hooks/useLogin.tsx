import { IS_AUTH, TOKEN, USER_KEY } from "../constants/AppConstants";
import { loginUser } from "../services/ApiServices";
import { saveDataLocal } from "../storage/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => {
      return loginUser(credentials.email, credentials.password);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      dispatch({ type: "LOGIN", user: data.data.user });
      saveDataLocal(USER_KEY, data.data.user);
      saveDataLocal(TOKEN, data.data.token);
      saveDataLocal(IS_AUTH, true);
      return data;
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  return {
    login,
    isSuccess: loginMutation.isSuccess,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message,
  };
};
