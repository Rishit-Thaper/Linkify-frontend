import { TOKEN, USER_KEY } from "../constants/AppConstants";
import { getLocalData } from "../storage/storage";
const AuthDetails = () => {
  const user = getLocalData(USER_KEY);
  const token = getLocalData(TOKEN);
const isAuthenticated = getLocalData("isAuthenticated");
  return { user, token, isAuthenticated };
};
export default AuthDetails;
