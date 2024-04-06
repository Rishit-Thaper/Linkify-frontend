import { USER_KEY } from "../constants/AppConstants";
import { registerUser } from "../services/ApiServices";
import { saveDataLocal } from "../storage/storage";
import { useMutation } from "@tanstack/react-query";
export const useSignup = () => {
  const registerMutation = useMutation({
    mutationFn: (credentials: {email: string, password: string, username: string})=>{
      return registerUser(credentials.username, credentials.email, credentials.password);
    },
      onSuccess: (data) => {
        saveDataLocal(USER_KEY, data);
        return data;
      },
    }
  );
  const signup = async (
    username: string,
    email: string,
    password: string
  ) => {
    await registerMutation.mutateAsync({ username, email, password });
  };

  return {
    signup,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
  };
};
