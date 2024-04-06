import { PROFILE_KEY, USER_KEY } from "../constants/AppConstants";

export const useLogout = () => {
  const logout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PROFILE_KEY);
    console.log("Logout");
  };
  return { logout };
};
