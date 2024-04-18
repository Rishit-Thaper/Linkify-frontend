import { User } from '../@types/global';
import { IS_AUTH, TOKEN, USER_KEY } from '../constants/AppConstants';
import { getLocalData } from '../storage/storage';
const AuthDetails = () => {
    const user: User | null = getLocalData(USER_KEY);
    const token: string | null = getLocalData(TOKEN);
    const isAuthenticated = getLocalData(IS_AUTH);
    return { user, token, isAuthenticated };
};
export default AuthDetails;
