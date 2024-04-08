import { useLogout } from "../hooks/useLogout";
import { AuthChecker } from "../libs/AuthChecker";

const Home = () => {
  const { logout } = useLogout();
  AuthChecker();
  return (
    <div>
      This is homepage
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Home;
