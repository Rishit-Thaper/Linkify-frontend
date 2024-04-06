import {
    Reducer,
    createContext,
    useReducer,
    useEffect,
    ReactNode,
    Dispatch,
  } from "react";
  import { User } from "@/app/@types/global";
  type AuthAction = {type: "LOGIN"; user: User} | {type: "LOGOUT"};
  type AuthState = {
    user: User | null;
  };
  type AuthContextType = {
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
  };
  export const AuthContext = createContext<AuthContextType>({
    state: {user: null},
    dispatch: () => {},
  });
  const authReducer: Reducer<
    {user: User | null},
    AuthAction
  > = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.user};
      case "LOGOUT":
        return { user: null};
      default:
        return state;
    }
  };
  export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: null,
    });
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user) {
        dispatch({type: "LOGIN", user: user});
      }
    }, []);
    console.log("Authentication State: ", state);
    return (
      <AuthContext.Provider value={{state, dispatch}}>
        {children}
      </AuthContext.Provider>
    );
  };