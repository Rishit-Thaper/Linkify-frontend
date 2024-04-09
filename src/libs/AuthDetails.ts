import { IS_AUTH, TOKEN, USER_KEY } from "../constants/AppConstants";
import { getLocalData } from "../storage/storage";
const AuthDetails = () => {
  const user: string | null = getLocalData(USER_KEY);
  console.log(user);
  const token: string | null = getLocalData(TOKEN);
  console.log(token);
  const isAuthenticated = getLocalData(IS_AUTH);
  return { user, token, isAuthenticated };
};
export default AuthDetails;
