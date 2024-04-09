import { IS_AUTH, TOKEN, USER_KEY } from "../constants/AppConstants";
import { registerUser } from "../services/ApiServices";
import { saveDataLocal } from "../storage/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { dispatch } = useAuthContext();
  const registerMutation = useMutation({
    mutationFn: (credentials: {
      email: string;
      password: string;
      username: string;
    }) => {
      return registerUser(
        credentials.username,
        credentials.email,
        credentials.password
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      dispatch({ type: "LOGIN", user: data.data.user });
      saveDataLocal(USER_KEY, data.data.user);
      saveDataLocal(TOKEN, data.data.accessToken);
      saveDataLocal(IS_AUTH, true);
      navigate("/");
      return data;
    },
  });
  const signup = async (username: string, email: string, password: string) => {
    await registerMutation.mutateAsync({ username, email, password });
  };

  return {
    signup,
    isSuccess:registerMutation.isSuccess,
    isLoading: registerMutation.isPending,
    error: registerMutation.error?.message,
  };
};
