import { USER_KEY } from "../constants/AppConstants";
import { loginUser } from "../services/ApiServices";
import { saveDataLocal } from "../storage/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useLogin = () => {
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => {
      return loginUser(credentials.email, credentials.password);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      saveDataLocal(USER_KEY, data);
      return data;
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  return {
    login,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
